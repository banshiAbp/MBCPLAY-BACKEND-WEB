import API_BASE_URL from "../../../config/api";
import { UploadCategoryImageResponse } from "../../../interfaces/media-management/category/uploadCategoryImageResponse";

export function uploadCategoryImage({
  file,
  token,
  onProgress,
}: {
  file: File;
  token: string | null;
  onProgress?: (progress: number) => void;
}): Promise<UploadCategoryImageResponse> {
  return new Promise((resolve, reject) => {
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
