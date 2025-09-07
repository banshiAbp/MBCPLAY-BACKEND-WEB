import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function submitGenre({
  title,
  description,
  code,
  status,
  token,
  id,
  navigate,
  setSessionExpired,
}: {
  title: string;
  description: string;
  code: string;
  status: boolean;
  token: string | null;
  id?: string;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}) {
  const isUpdate = Boolean(id);
  const url = isUpdate
    ? `${API_BASE_URL}genre/manage/${id}`
    : `${API_BASE_URL}genre/manage`;
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
        genreTitle: title,
        genreDescription: description,
        genreCode: code,
        genreStatus: status,
      }),
    },
    navigate,
    setSessionExpired
  );
  const data = await response.json();
  return { response, data };
}
