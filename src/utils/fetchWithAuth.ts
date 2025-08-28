import API_BASE_URL from "../config/api";

/**
 * Wrapper for fetch that handles 401 errors globally.
 * On 401, clears token, redirects to login, and shows session expired message.
 */
export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
  navigate?: (path: string, options?: any) => void,
  setSessionExpired?: (msg: string) => void
) {
  const token = localStorage.getItem("token");
  const headers = {
    ...(init?.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };
  const response = await fetch(input, {
    ...init,
    headers,
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
    if (setSessionExpired)
      setSessionExpired("Session expired! Please do login again.");
    if (navigate) navigate("/login", { replace: true });
    throw new Error("Session expired");
  }
  return response;
}
