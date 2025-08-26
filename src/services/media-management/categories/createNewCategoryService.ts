import API_BASE_URL from "../../../config/api";

export async function submitCategory({
  name,
  description,
  imageUrl,
  status,
  token,
}: {
  name: string;
  description: string;
  imageUrl: string;
  status: boolean;
  token: string | null;
}) {
  const response = await fetch(`${API_BASE_URL}category/manage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      categoryTitle: name,
      categoryDescription: description,
      categoryImagePath: imageUrl || "",
      categoryStatus: status,
    }),
  });
  const data = await response.json();
  return { response, data };
}
