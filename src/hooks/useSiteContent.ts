import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { siteContentConfig } from "@/lib/siteContentConfig";

interface ContentMap {
  [key: string]: string;
}

/**
 * Fetches dynamic content for a given page slug from site_content table.
 * Falls back to defaultValue from siteContentConfig if no DB value exists.
 *
 * Usage:
 *   const { v, loading } = useSiteContent("home");
 *   v("hero", "title")  // returns the dynamic or default value
 */
export function useSiteContent(pageSlug: string) {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  // Build default map from config
  const pageConfig = siteContentConfig.find((p) => p.slug === pageSlug);
  const defaults: ContentMap = {};
  if (pageConfig) {
    for (const section of pageConfig.sections) {
      for (const field of section.fields) {
        defaults[`${section.key}__${field.key}`] = field.defaultValue;
      }
    }
  }

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("section_key, field_key, content_value")
        .eq("page_slug", pageSlug);

      if (cancelled) return;

      const map: ContentMap = {};
      data?.forEach((row) => {
        if (row.content_value) {
          map[`${row.section_key}__${row.field_key}`] = row.content_value;
        }
      });

      setContent(map);
      setLoading(false);
    };

    load();
    return () => { cancelled = true; };
  }, [pageSlug]);

  /** Get a field value: DB value → config default → fallback */
  const v = (sectionKey: string, fieldKey: string, fallback = ""): string => {
    const key = `${sectionKey}__${fieldKey}`;
    return content[key] || defaults[key] || fallback;
  };

  return { v, loading };
}
