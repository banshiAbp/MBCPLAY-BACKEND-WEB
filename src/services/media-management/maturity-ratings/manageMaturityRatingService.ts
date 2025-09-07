import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function manageMaturityRating({
  title,
  description,
  code,
  status,
  id,
  navigate,
  setSessionExpired,
}: {
  title: string;
  description: string;
  code: string;
  status: boolean;
  id?: string;
  navigate?: (path: string, options?: any) => void;
  setSessionExpired?: (msg: string) => void;
}) {
  const isUpdate = Boolean(id);
  const url = isUpdate
    ? `${API_BASE_URL}maturity-rating/manage/${id}`
    : `${API_BASE_URL}maturity-rating/manage`;
  const method = isUpdate ? "PUT" : "POST";
  
  const response = await fetchWithAuth(
    url,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maturityRatingTitle: title,
        maturityRatingDescription: description,
        maturityRatingCode: code,
        maturityRatingStatus: status,
      }),
    },
    navigate,
    setSessionExpired
  );
  const data = await response.json();
  return { response, data };
}
