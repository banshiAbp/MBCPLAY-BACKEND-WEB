import { store } from "../store/store";
import { logout } from "../store/authSlice";
import { clearAuthFromStorage } from "./authPersistence";

/**
 * Wrapper for fetch that handles 401 errors globally.
 * On 401, clears token from Redux store, localStorage, redirects to login, and shows session expired message.
 */
export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
  navigate?: (path: string, options?: any) => void,
  setSessionExpired?: (msg: string) => void
) {
  // Get token from Redux store
  const state = store.getState();
  const token = state.auth.token;
  
  const headers = {
    ...(init?.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };
  
  const response = await fetch(input, {
    ...init,
    headers,
  });
  
  if (response.status === 401) {
    // Dispatch logout action to clear Redux state
    store.dispatch(logout());
    
    // Clear localStorage
    clearAuthFromStorage();
    
    if (setSessionExpired)
      setSessionExpired("Session expired! Please do login again.");
    if (navigate) navigate("/login", { replace: true });
    throw new Error("Session expired");
  }
  
  return response;
}
