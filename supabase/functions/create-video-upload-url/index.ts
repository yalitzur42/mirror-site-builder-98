import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const URL_ = Deno.env.get("SUPABASE_URL")!;
    const SR = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    if (!jwt) return json({ error: "no auth" }, 401);

    const userClient = createClient(URL_, ANON, { global: { headers: { Authorization: `Bearer ${jwt}` } } });
    const { data: u, error: ue } = await userClient.auth.getUser();
    if (ue || !u.user) return json({ error: "not auth" }, 401);

    const admin = createClient(URL_, SR);
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
    if (isAdmin !== true) return json({ error: "forbidden" }, 403);

    const { pageSlug, sectionKey, fieldKey, fileName } = await req.json();
    if (!pageSlug || !sectionKey || !fieldKey || !fileName) return json({ error: "missing fields" }, 400);

    const ext = (String(fileName).split(".").pop() || "mp4").toLowerCase();
    const path = `${pageSlug}/${sectionKey}/${fieldKey}-${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const { data, error } = await admin.storage.from("site-videos").createSignedUploadUrl(path);
    if (error) return json({ error: error.message }, 500);

    const { data: pub } = admin.storage.from("site-videos").getPublicUrl(path);
    return json({ signedUrl: data.signedUrl, token: data.token, path, publicUrl: pub.publicUrl });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "unknown" }, 500);
  }
});
