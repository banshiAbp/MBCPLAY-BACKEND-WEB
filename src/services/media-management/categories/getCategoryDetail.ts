import API_BASE_URL from "../../../config/api";

export async function getCategoryDetail({
  id,
  token,
}: {
  id: string;
  token: string | null;
}) {
  const response = await fetch(`${API_BASE_URL}category/detail/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const data = await response.json();
  return { response, data };
}
