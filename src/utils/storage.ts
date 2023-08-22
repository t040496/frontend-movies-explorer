import { IMovieItem } from "api/moviesApi";

// Cached movies

export const getCachedMovies = (): IMovieItem[] => {
  const str = localStorage.getItem("foundMovies");

  if (!str) {
    return [];
  }

  return JSON.parse(str);
};

export const setMoviesToCache = (movies: IMovieItem[]) =>
  localStorage.setItem("foundMovies", JSON.stringify(movies));

// Cached search criteria

export const getCachedSearchCriteria = () =>
  localStorage.getItem("searchCriteria") || "";

export const setSearchCriteriaToCache = (txt: string) =>
  localStorage.setItem("searchCriteria", txt);

// Cached length criteria

export const getCachedLengthCriteria = () =>
  localStorage.getItem("lengthCriteria") === "true";

export const setLengthCriteriaToCache = (state: boolean) =>
  localStorage.setItem("lengthCriteria", String(state));

// Common

export const purgeStorage = () =>
  ["foundMovies", "searchCriteria", "lengthCriteria"].forEach((x) =>
    localStorage.removeItem(x),
  );
