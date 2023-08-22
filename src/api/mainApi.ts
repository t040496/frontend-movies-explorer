import { getEnvVar, request } from "utils/api";

export const MAIN_API_URL = getEnvVar("REACT_APP_MAIN_API_URL");

const buildUrl = (urlPrefix: string) => MAIN_API_URL + urlPrefix;

/**
 * signIn
 */

export interface ISignInProps {
  email: string;
  password: string;
}

export const signIn = ({ email, password }: ISignInProps) =>
  request({
    config: {
      method: "POST",
    },
    body: {
      email,
      password,
    },
    baseUrl: buildUrl("/signin"),
  });

/**
 * signUp
 */

export interface ISignUpProps {
  email: string;
  name: string;
  password: string;
}

export const signUp = ({ email, name, password }: ISignUpProps) =>
  request({
    config: {
      method: "POST",
    },
    body: {
      email,
      name,
      password,
    },
    baseUrl: buildUrl("/signup"),
  });

/**
 * signOut
 */

export const signOut = () =>
  request({
    config: {
      method: "POST",
    },
    baseUrl: buildUrl("/signout"),
  });

/**
 * myProfile
 */

export interface IMyProfileResponse {
  _id: string;
  email: string;
  name: string;
}

export const myProfile = (): Promise<IMyProfileResponse> =>
  request({
    config: {
      method: "GET",
    },
    baseUrl: buildUrl("/users/me"),
  });

/**
 * updateProfile
 */

export interface IUpdateProfileProps {
  email: string;
  name: string;
}

export const updateProfile = ({ email, name }: IUpdateProfileProps) =>
  request({
    config: {
      method: "PATCH",
    },
    body: {
      email,
      name,
    },
    baseUrl: buildUrl("/users/me"),
  });

/**
 * mySavedMovies
 */

export interface IMySavedMoviesResponse {
  _id: string;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  owner?: string;
  movieId: number;
  nameRU: string;
  nameEN: string;
}

export const mySavedMovies = (): Promise<IMySavedMoviesResponse[]> =>
  request({
    config: {
      method: "GET",
    },
    baseUrl: buildUrl("/movies"),
  });

/**
 * saveMovie
 */

export interface ISaveMovieProps {
  movieId: string | number;
  description: string;
  image: string;
  thumbnail: string;
  nameRU: string;
  nameEN: string;
  duration: string | number;
  director: string;
  country: string;
  year: string | number;
  trailerLink: string;
}

export interface ISaveMovieResponse extends ISaveMovieProps {
  _id: string;
}

export const saveMovie = (data: ISaveMovieProps): Promise<ISaveMovieResponse> =>
  request({
    config: {
      method: "POST",
    },
    body: { ...data },
    baseUrl: buildUrl("/movies"),
  });

/**
 * removeMovie
 */

export const removeMovie = (movieId: string | number) =>
  request({
    config: {
      method: "DELETE",
    },
    baseUrl: buildUrl(`/movies/${movieId}`),
  });
