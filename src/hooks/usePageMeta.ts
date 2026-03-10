import { useEffect } from "react";

interface PageMeta {
  title: string;
  description?: string;
}

const SITE_NAME = "Mac'ho";

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;

      // OG tags
      const ogTags: Record<string, string> = {
        "og:title": `${title} | ${SITE_NAME}`,
        "og:description": description,
      };
      for (const [prop, content] of Object.entries(ogTags)) {
        let tag = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", prop);
          document.head.appendChild(tag);
        }
        tag.content = content;
      }
    }
  }, [title, description]);
}
