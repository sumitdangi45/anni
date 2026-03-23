import { useState, useEffect } from "react";

/**
 * Persists like state in localStorage and syncs with the backend.
 * @param blogId  MongoDB _id of the blog
 * @param initialLikes  likes count from the fetched blog data
 */
export function useLike(blogId: string, initialLikes: number) {
  const storageKey = `liked_blog_${blogId}`;
  const [liked, setLiked] = useState(() => {
    try { return localStorage.getItem(storageKey) === "1"; } catch { return false; }
  });
  const [likeCount, setLikeCount] = useState(initialLikes);

  // Sync count when blog data loads (initialLikes may start at 0 before fetch)
  useEffect(() => {
    setLikeCount(initialLikes);
  }, [initialLikes]);

  const toggleLike = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = !liked;
    setLiked(next);
    setLikeCount(prev => Math.max(0, next ? prev + 1 : prev - 1));
    try {
      localStorage.setItem(storageKey, next ? "1" : "0");
    } catch {}
    try {
      const res = await fetch(`/api/blogs/${blogId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: next ? "like" : "unlike" }),
      });
      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.likes);
      }
    } catch {}
  };

  return { liked, likeCount, toggleLike };
}
