export interface Advertisement {
  advertisementId: string;
  advertisementTitle: string;
  advertisementDescription: string;
  advertisementUrl: string;
  advertisementStatus: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  updatedBy: string;
}

export interface AdvertisementListResponse {
  data: {
    advertisements: Advertisement[];
    total: number;
    page_no: number;
    page_size: number;
  };
  message: string;
  status: string;
  code: number;
}

export interface AdvertisementDetailResponse {
  data: Advertisement;
  message: string;
  status: string;
  code: number;
}

export interface AdvertisementManageRequest {
  advertisementTitle: string;
  advertisementDescription: string;
  advertisementUrl: string;
  advertisementStatus: boolean;
}
