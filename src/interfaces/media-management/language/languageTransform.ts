import { LanguageType } from "./languageType";

export function transformLanguageApiData(apiData: any): LanguageType {
  return {
    languageId: apiData.language_id || "",
    languageTitle: apiData.language_title || "",
    languageFontSample: apiData.language_font_sample || "",
    languageStatus: apiData.language_status ?? false,
  };
}
