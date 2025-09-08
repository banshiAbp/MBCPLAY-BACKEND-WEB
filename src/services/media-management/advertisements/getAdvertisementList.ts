import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import API_BASE_URL from "../../../config/api";
import { AdvertisementListResponse } from "../../../interfaces/media-management/advertisement/advertisementType";

interface GetAdvertisementListParams {
  page: number;
  token: string;
}

export const getAdvertisementList = async ({
  page,
  token,
}: GetAdvertisementListParams): Promise<AdvertisementListResponse> => {
  const response = await fetchWithAuth(
    `${API_BASE_URL}advertisement/list?page_no=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch advertisements");
  }

  return response.json();
};
