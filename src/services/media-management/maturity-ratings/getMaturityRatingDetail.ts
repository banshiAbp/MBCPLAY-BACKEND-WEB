import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getMaturityRatingDetail({
  id,
  navigate,
  setSessionExpired,
}: {
  id: string;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}) {
  const response = await fetchWithAuth(
    `${API_BASE_URL}maturity-rating/detail/${id}`,
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
