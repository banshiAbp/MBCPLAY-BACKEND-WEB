import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getLanguageList({
  page = 1,
  token,
  navigate,
  setSessionExpired,
}: {
  page?: number;
  token: string | null;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}) {
  const response = await fetchWithAuth(
    `${API_BASE_URL}language/list?page_no=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
    navigate,
    setSessionExpired
  );
  const data = await response.json();
  return { response, data };
}
