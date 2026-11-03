import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

const SITE_NAME = "Anni Web Solutions Pvt. Ltd.";
const BASE_URL  = "https://anniwebsolution.vercel.app";
const OG_IMAGE  = `${BASE_URL}/og-image.png`;

export function useSEO({ title, description, ogImage, canonical }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const isProperty = selector.includes("[property");
        const attr = isProperty ? "property" : "name";
        const val  = selector.match(/["']([^"']+)["']/)?.[1] ?? "";
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Title tags
    setMeta('meta[property="og:title"]',    fullTitle);
    setMeta('meta[name="twitter:title"]',   fullTitle);

    // Description
    if (description) {
      setMeta('meta[name="description"]',          description);
      setMeta('meta[property="og:description"]',   description);
      setMeta('meta[name="twitter:description"]',  description);
    }

    // OG image
    const img = ogImage || OG_IMAGE;
    setMeta('meta[property="og:image"]',   img);
    setMeta('meta[name="twitter:image"]',  img);

    // Canonical
    if (canonical) {
      setLink("canonical", canonical);
    }

    // OG URL
    if (canonical) {
      setMeta('meta[property="og:url"]', canonical);
    }
  }, [title, description, ogImage, canonical]);
}
