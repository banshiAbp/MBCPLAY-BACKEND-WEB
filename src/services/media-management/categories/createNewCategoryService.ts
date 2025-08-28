import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function submitCategory({
  name,
  description,
  imageUrl,
  status,
  token,
  id,
  navigate,
  setSessionExpired,
}: {
  name: string;
  description: string;
  imageUrl: string;
  status: boolean;
  token: string | null;
  id?: string;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}) {
  const isUpdate = Boolean(id);
  const url = isUpdate
    ? `${API_BASE_URL}category/manage/${id}`
    : `${API_BASE_URL}category/manage`;
  const method = isUpdate ? "PUT" : "POST";
  const response = await fetchWithAuth(
    url,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        categoryTitle: name,
        categoryDescription: description,
        categoryImagePath: imageUrl || "",
        categoryStatus: status,
      }),
    },
    navigate,
    setSessionExpired
  );
  const data = await response.json();
  return { response, data };
}
