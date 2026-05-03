import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/heic",
  "image/heif",
  "image/avif",
];

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;

interface Payload {
  bucket?: string;
  pageSlug?: string;
  sectionKey?: string;
  fieldKey?: string;
  fileName?: string;
  contentType?: string;
  fileBase64?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    const jwt = authHeader.replace("Bearer ", "");
    if (!jwt) return json({ error: "Missing auth token" }, 401);

    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: userRes, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userRes.user) return json({ error: "Not authenticated" }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: isAdmin, error: roleErr } = await admin.rpc("has_role", {
      _user_id: userRes.user.id,
      _role: "admin",
    });

    if (roleErr || isAdmin !== true) return json({ error: "Forbidden — admin only" }, 403);

    const body = (await req.json()) as Payload;
    const bucket = body.bucket === "site-videos" ? "site-videos" : "site-assets";
    const pageSlug = (body.pageSlug || "").trim();
    const sectionKey = (body.sectionKey || "").trim();
    const fieldKey = (body.fieldKey || "").trim();
    const fileName = (body.fileName || "").trim();
    const contentType = (body.contentType || "").trim().toLowerCase();
    const fileBase64 = body.fileBase64 || "";

    if (!pageSlug || !sectionKey || !fieldKey || !fileName || !fileBase64) {
      return json({ error: "Missing required upload fields" }, 400);
    }

    if (bucket !== "site-assets") {
      return json({ error: "Unsupported bucket" }, 400);
    }

    if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
      return json({ error: `Unsupported file type: ${contentType || fileName}` }, 400);
    }

    const bytes = Uint8Array.from(atob(fileBase64), (char) => char.charCodeAt(0));
    if (bytes.byteLength > MAX_IMAGE_SIZE) {
      return json({ error: "הקובץ גדול מדי (מקסימום 20MB)" }, 400);
    }

    const ext = fileName.includes(".") ? fileName.split(".").pop() : "bin";
    const filePath = `${pageSlug}/${sectionKey}/${fieldKey}-${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await admin.storage.from(bucket).upload(filePath, bytes, {
      contentType,
      upsert: false,
    });

    if (uploadError) {
      return json({ error: uploadError.message }, 500);
    }

    const { data } = admin.storage.from(bucket).getPublicUrl(filePath);
    return json({ publicUrl: data.publicUrl, filePath });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unknown upload error" }, 500);
  }
});
