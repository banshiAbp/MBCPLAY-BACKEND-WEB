import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getCategoryDetail({
  id,
  navigate,
  setSessionExpired,
}: {
  id: string;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}) {
  const response = await fetchWithAuth(
    `${API_BASE_URL}category/detail/${id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    },
    navigate,
    setSessionExpired
  );
  const data = await response.json();
  return { response, data };
}
