// In dev: Vite proxy handles /api → localhost:3001
// In prod: VITE_API_URL points to Render backend
export const API_BASE = import.meta.env.VITE_API_URL ?? "";

export const apiFetch = (url: string, options?: RequestInit) =>
  fetch(`${API_BASE}${url}`, options);
