import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import { LanguageType } from "../../../interfaces/media-management/language/languageType";

export async function createOrUpdateLanguage(
  language: Partial<LanguageType>,
  languageId?: string
) {
  const url = languageId
    ? `${API_BASE_URL}language/manage/${languageId}`
    : `${API_BASE_URL}language/manage`;
  const method = languageId ? "PUT" : "POST";
  const response = await fetchWithAuth(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(language),
  });
  const data: any = await response.json();
  if (!response.ok || data?.code !== 200) {
    throw new Error("Failed to save language");
  }
  return data;
}
