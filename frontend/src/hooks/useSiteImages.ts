/**
 * Fetches /api/site-images once and caches in localStorage (5 min TTL).
 * Cache hit → images available instantly on next load (no flash).
 */
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

const CACHE_KEY = "site_images_cache";
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry {
  data: Record<string, string>;
  ts: number;
}

function readCache(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.ts > CACHE_TTL) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(data: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

let fetchPromise: Promise<Record<string, string>> | null = null;

function fetchSiteImages(): Promise<Record<string, string>> {
  if (!fetchPromise) {
    fetchPromise = fetch(`${API_BASE}/api/site-images`)
      .then(r => r.json())
      .then(data => { writeCache(data); fetchPromise = null; return data as Record<string, string>; })
      .catch(() => { fetchPromise = null; return {} as Record<string, string>; });
  }
  return fetchPromise;
}

export function useSiteImages(): Record<string, string> {
  const [images, setImages] = useState<Record<string, string>>(() => readCache() ?? {});

  useEffect(() => {
    fetchSiteImages().then(data => {
      if (Object.keys(data).length > 0) setImages(data);
    });
  }, []);

  return images;
}
