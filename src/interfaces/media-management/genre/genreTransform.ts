import { Genre } from "./genreType";

export function transformGenreList(apiList: any[]): Genre[] {
  return apiList.map((item) => ({
    id: item.genre_id,
    genreTitle: item.genre_title,
    genreDescription: item.genre_description,
    genreCode: item.genre_code,
    genreStatus: Boolean(item.genre_status),
  }));
}
