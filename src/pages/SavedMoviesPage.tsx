import React, { useCallback, useEffect, useState } from "react";
import styles from "./SavedMoviesPage.module.scss";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { MovieCard } from "../components/MovieCard/MovieCard";
import {
  IMySavedMoviesResponse,
  mySavedMovies,
  removeMovie,
} from "api/mainApi";
import { useSnackbar } from "notistack";

export const SHORT_MOVIE_LEN = 40;

export const SavedMoviesPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [searchTxt, setSearchTxt] = useState<string>("");
  const [catalogItems, setCatalogItems] = useState<IMySavedMoviesResponse[]>(
    [],
  );
  const [isShortMovie, setShortMovieState] = useState<boolean>(false);

  const [fetchedMovies, setFetchedMovies] = useState<IMySavedMoviesResponse[]>(
    [],
  );

  const handleOnShortSwitch = useCallback((state: boolean) => {
    setShortMovieState(state);
  }, []);

  const fetchSavedMovies = useCallback(async () => {
    try {
      const queryData = await mySavedMovies();
      setFetchedMovies(queryData);
    } catch (e: any) {
      setFetchedMovies([]);
    }
  }, []);

  const handleOnRemoveMovie = useCallback(
    async (id: string | number) => {
      try {
        await removeMovie(id);
        setFetchedMovies(fetchedMovies.filter((x) => x._id !== id));

        enqueueSnackbar("Фильм успешно удален из личной картотеки", {
          variant: "success",
        });
      } catch (e: any) {
        enqueueSnackbar(e.message, {
          variant: "error",
        });
      }
    },
    [fetchedMovies],
  );

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  const handleOnSearch = useCallback((txt: string) => {
    setSearchTxt(txt);
  }, []);

  useEffect(() => {
    if (fetchedMovies.length) {
      const filterCriteriaPrepared = searchTxt.toLowerCase().trim();

      let fetchedMoviesFiltered = fetchedMovies.filter((m) => {
        const nameRuTitlePrepared = m.nameRU.toLowerCase().trim();
        const nameEnTitlePrepared = m.nameEN.toLowerCase().trim();

        return (
          nameRuTitlePrepared.includes(filterCriteriaPrepared) ||
          nameEnTitlePrepared.includes(filterCriteriaPrepared)
        );
      });

      if (isShortMovie) {
        fetchedMoviesFiltered = fetchedMoviesFiltered.filter(
          (m) => m.duration <= SHORT_MOVIE_LEN,
        );
      }

      setCatalogItems(fetchedMoviesFiltered);
    } else {
      setCatalogItems([]);
    }
  }, [searchTxt, fetchedMovies, isShortMovie]);

  return (
    <div className={styles.savedMoviesPage}>
      <div className="page-section">
        <SearchBar
          onSearch={handleOnSearch}
          onSwitchShort={handleOnShortSwitch}
          defaultSearchValue={searchTxt}
          defaultShortValue={isShortMovie}
        />
        {catalogItems.length ? (
          <div className={styles.savedMoviesPage__catalog}>
            <div className={styles["savedMoviesPage__catalog-wrapper"]}>
              {catalogItems.map((props) => (
                <MovieCard
                  key={props._id}
                  id={props._id}
                  title={props.nameRU}
                  image={props.image}
                  duration={props.duration}
                  link={props.trailerLink}
                  onRemove={handleOnRemoveMovie}
                  isAdded
                />
              ))}
            </div>
          </div>
        ) : !searchTxt ? (
          <div className={styles["savedMoviesPage__catalog-placeholder"]}>
            Начните вводить в поле поиска :)
          </div>
        ) : (
          <div className={styles["savedMoviesPage__catalog-placeholder"]}>
            Ничего не найдено :(
          </div>
        )}
      </div>
    </div>
  );
};
