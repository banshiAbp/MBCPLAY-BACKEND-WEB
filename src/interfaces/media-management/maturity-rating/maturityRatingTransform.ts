import { MaturityRating, MaturityRatingApiResponse } from "./maturityRatingType";

export const transformMaturityRatingList = (apiData: MaturityRatingApiResponse[]): MaturityRating[] => {
  return apiData.map((item) => ({
    id: item.maturity_rating_id,
    title: item.maturity_rating_title,
    description: item.maturity_rating_description,
    code: item.maturity_rating_code,
    status: item.maturity_rating_status,
  }));
};

export const transformMaturityRatingDetail = (apiData: MaturityRatingApiResponse): MaturityRating => {
  return {
    id: apiData.maturity_rating_id,
    title: apiData.maturity_rating_title,
    description: apiData.maturity_rating_description,
    code: apiData.maturity_rating_code,
    status: apiData.maturity_rating_status,
  };
};
