// src/interfaces/media-management/categoryTransform.ts
import { Category } from "./categoryType";

export function transformCategoryApiResponse(apiCategory: any): Category {
  return {
    id: apiCategory.category_id,
    title: apiCategory.category_title,
    description: apiCategory.category_description,
    status: Boolean(apiCategory.category_status),
    iconUrl: apiCategory.category_image_path,
  };
}

export function transformCategoryList(apiList: any[]): Category[] {
  return (apiList || []).map(transformCategoryApiResponse);
}
