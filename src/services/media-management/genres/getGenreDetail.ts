import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getGenreDetail({
  id,
  token,
  navigate,
  setSessionExpired,
}: {
  id: string;
  token: string | null;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}) {
  const response = await fetchWithAuth(
    `${API_BASE_URL}genre/detail/${id}`,
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
