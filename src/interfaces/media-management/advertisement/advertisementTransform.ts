import { Advertisement } from "./advertisementType";

export const transformAdvertisementList = (advertisements: any[]): Advertisement[] => {
  return advertisements.map((ad) => ({
    advertisementId: ad.advertisement_id,
    advertisementTitle: ad.advertisement_title,
    advertisementDescription: ad.advertisement_description,
    advertisementUrl: ad.advertisement_url,
    advertisementStatus: ad.advertisement_status,
    createdOn: ad.created_on,
    createdBy: ad.created_by,
    updatedOn: ad.updated_on,
    updatedBy: ad.updated_by,
  }));
};

export const transformAdvertisementDetail = (advertisement: any): Advertisement => {
  return {
    advertisementId: advertisement.advertisement_id,
    advertisementTitle: advertisement.advertisement_title,
    advertisementDescription: advertisement.advertisement_description,
    advertisementUrl: advertisement.advertisement_url,
    advertisementStatus: advertisement.advertisement_status,
    createdOn: advertisement.created_on,
    createdBy: advertisement.created_by,
    updatedOn: advertisement.updated_on,
    updatedBy: advertisement.updated_by,
  };
};
