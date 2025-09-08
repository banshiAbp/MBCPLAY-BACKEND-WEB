import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import API_BASE_URL from "../../../config/api";
import { AdvertisementDetailResponse } from "../../../interfaces/media-management/advertisement/advertisementType";

interface GetAdvertisementDetailParams {
  id: string;
  token: string;
}

export const getAdvertisementDetail = async ({
  id,
  token,
}: GetAdvertisementDetailParams): Promise<AdvertisementDetailResponse> => {
  const response = await fetchWithAuth(
    `${API_BASE_URL}advertisement/detail/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch advertisement details");
  }

  return response.json();
};
