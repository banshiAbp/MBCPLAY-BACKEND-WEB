export interface MaturityRating {
  id: string;
  title: string;
  description: string;
  code: string;
  status: boolean;
}

export interface MaturityRatingApiResponse {
  maturity_rating_id: string;
  maturity_rating_title: string;
  maturity_rating_description: string;
  maturity_rating_code: string;
  maturity_rating_status: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MaturityRatingListResponse {
  maturity_ratings: MaturityRatingApiResponse[];
  total: number;
  page_no: number;
  totalPages: number;
}

export interface MaturityRatingDetailResponse {
  maturity_rating_id: string;
  maturity_rating_title: string;
  maturity_rating_description: string;
  maturity_rating_code: string;
  maturity_rating_status: boolean;
  created_at: string;
  updated_at: string;
}
