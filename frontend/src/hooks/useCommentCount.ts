import { useState, useEffect } from "react";

export function useCommentCount(blogId: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!blogId || blogId.length < 10) return; // skip fallback IDs like "1","2"
    fetch(`/api/comments/${blogId}/count`)
      .then(r => r.json())
      .then(data => { if (typeof data.count === "number") setCount(data.count); })
      .catch(() => {});
  }, [blogId]);

  return count;
}
