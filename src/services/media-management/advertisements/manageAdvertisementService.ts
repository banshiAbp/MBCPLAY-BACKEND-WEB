import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import API_BASE_URL from "../../../config/api";
import { AdvertisementManageRequest } from "../../../interfaces/media-management/advertisement/advertisementType";

interface ManageAdvertisementParams {
  data: AdvertisementManageRequest;
  token: string;
}

interface UpdateAdvertisementParams {
  id: string;
  data: AdvertisementManageRequest;
  token: string;
}

export const createAdvertisement = async ({
  data,
  token,
}: ManageAdvertisementParams) => {
  const response = await fetchWithAuth(
    `${API_BASE_URL}advertisement/manage`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create advertisement");
  }

  return response.json();
};

export const updateAdvertisement = async ({
  id,
  data,
  token,
}: UpdateAdvertisementParams) => {
  console.log("updateAdvertisement service called with:", { id, data, token });
  const response = await fetchWithAuth(
    `${API_BASE_URL}advertisement/manage/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  console.log("updateAdvertisement response:", response);
  if (!response.ok) {
    throw new Error("Failed to update advertisement");
  }

  return response.json();
};
