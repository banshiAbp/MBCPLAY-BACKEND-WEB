export interface UploadCategoryImageResponse {
  data?: { public_url?: string; file_name?: string };
  message?: string;
  status: number;
  code?: number;
}
