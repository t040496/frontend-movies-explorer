import { getEnvVar, request } from "utils/api";

export const MOVIES_API_URL = getEnvVar("REACT_APP_MOVIES_API_URL");

export const buildUrl = (urlPrefix: string) => MOVIES_API_URL + urlPrefix;

/**
 * allMovies
 */

export interface IMovieItem {
  id: number;
  nameRU: string;
  nameEN: string;
  director: string;
  country: string;
  year: string;
  duration: number;
  description: string;
  trailerLink: string;
  created_at: string;
  updated_at: string;
  image: Image;
}

export interface Image {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: unknown;
  created_at: string;
  updated_at: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  small: Small;
}

export interface Thumbnail {
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: unknown;
  url: string;
}

export interface Small {
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: unknown;
  url: string;
}

export const allMovies = (): Promise<IMovieItem[]> =>
  request({
    config: {
      method: "GET",
      credentials: "omit",
    },
    baseUrl: buildUrl("/beatfilm-movies"),
  });
