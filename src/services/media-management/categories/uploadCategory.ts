import API_BASE_URL from "../../../config/api";
import { UploadCategoryImageResponse } from "../../../interfaces/media-management/category/uploadCategoryImageResponse";
import { store } from "../../../store/store";
import { logout } from "../../../store/authSlice";
import { clearAuthFromStorage } from "../../../utils/authPersistence";

export function uploadCategoryImage({
  file,
  onProgress,
  navigate,
  setSessionExpired,
}: {
  file: File;
  onProgress?: (progress: number) => void;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}): Promise<UploadCategoryImageResponse> {
  return new Promise((resolve, reject) => {
    // Get token from Redux store
    const state = store.getState();
    const token = state.auth.token;
    
    const formData = new FormData();
    formData.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}utility/upload-image`);
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status === 401) {
        // Dispatch logout action to clear Redux state
        store.dispatch(logout());
        
        // Clear localStorage
        clearAuthFromStorage();
        
        if (setSessionExpired)
          setSessionExpired("Session expired! Please do login again.");
        if (navigate) navigate("/login", { replace: true });
        reject({
          message: "Session expired! Please do login again.",
          status: 401,
        });
        return;
      }
      try {
        const data = JSON.parse(xhr.responseText);
        resolve({ ...data, status: xhr.status });
      } catch {
        reject({ message: "Image upload failed", status: xhr.status });
      }
    };
    xhr.onerror = () => {
      reject({ message: "Image upload failed", status: xhr.status });
    };
    xhr.send(formData);
  });
}
