import { API_BASE } from "./api";

export const adminFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  }
  return res;
};
