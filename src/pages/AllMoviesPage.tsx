import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./SavedMoviesPage.module.scss";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { MovieCard } from "../components/MovieCard/MovieCard";
import { IMovieItem, allMovies, buildUrl } from "api/moviesApi";
import {
  getCachedLengthCriteria,
  getCachedMovies,
  getCachedSearchCriteria,
  setLengthCriteriaToCache,
  setMoviesToCache,
  setSearchCriteriaToCache,
} from "utils/storage";
import {
  IMySavedMoviesResponse,
  mySavedMovies,
  removeMovie,
  saveMovie,
} from "api/mainApi";
import { useSnackbar } from "notistack";
import { Button } from "components/Button/Button";
import { useAllMoviesPaginatorScreenSize } from "./helpers";
import { SIZES } from "./configs";
import { SHORT_MOVIE_LEN } from "./SavedMoviesPage";

export const AllMoviesPage = () => {
  const searchTxtCached = getCachedSearchCriteria();
  const moviesCached = getCachedMovies();
  const lengthCriteriaCached = getCachedLengthCriteria();
  const { enqueueSnackbar } = useSnackbar();

  const [searchTxt, setSearchTxt] = useState<string>(searchTxtCached);
  const [catalogItems, setCatalogItems] = useState<IMovieItem[]>([]);
  const [isShortMovie, setShortMovieState] =
    useState<boolean>(lengthCriteriaCached);

  const [fetchedMovies, setFetchedMovies] =
    useState<IMovieItem[]>(moviesCached);
  const [savedMovies, setSavedMovies] = useState<IMySavedMoviesResponse[]>([]);

  const handleOnShortSwitch = useCallback((state: boolean) => {
    setShortMovieState(state);
    setLengthCriteriaToCache(state);
  }, []);

  const handleOnLike = useCallback(
    async (id: string | number) => {
      try {
        const savedMovie = savedMovies.find((x) => x.movieId === id);

        if (savedMovie) {
          await removeMovie(savedMovie._id);
          setSavedMovies(savedMovies.filter((x) => x.movieId !== id));

          enqueueSnackbar("Фильм успешно удален из личной картотеки", {
            variant: "success",
          });

          return;
        }

        const movieById = fetchedMovies.find((x) => x.id === id);

        if (movieById) {
          const insertedMovie = {
            movieId: movieById.id,
            description: movieById.description,
            image: buildUrl(movieById.image.url),
            thumbnail: buildUrl(movieById.image.formats.thumbnail.url),
            nameEN: movieById.nameEN,
            nameRU: movieById.nameRU,
            duration: movieById.duration,
            director: movieById.director,
            country: movieById.country,
            year: movieById.year,
            trailerLink: movieById.trailerLink,
          };

          const saveMovieQuery = await saveMovie(insertedMovie);

          setSavedMovies((prev) => [
            ...prev,
            {
              ...insertedMovie,
              _id: saveMovieQuery._id,
            },
          ]);

          enqueueSnackbar("Фильм успешно добавлен в личную картотеку", {
            variant: "success",
          });
        }
      } catch (e: any) {
        enqueueSnackbar(e.message, {
          variant: "error",
        });
      }
    },
    [fetchedMovies, savedMovies],
  );

  const fetchSavedMovies = useCallback(async () => {
    try {
      const queryData = await mySavedMovies();
      setSavedMovies(queryData);
    } catch (e: any) {
      setSavedMovies([]);
    }
  }, []);

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  const fetchAllMovies = useCallback(async () => {
    const queryData = await allMovies();
    setFetchedMovies(queryData);
    setMoviesToCache(queryData);
  }, []);

  useEffect(() => {
    if (searchTxt && !fetchedMovies.length) {
      fetchAllMovies();
    }
  }, [searchTxt, fetchedMovies]);

  const handleOnSearch = useCallback((txt: string) => {
    setSearchTxt(txt);
    setSearchCriteriaToCache(txt);
  }, []);

  useEffect(() => {
    if (searchTxt && fetchedMovies.length) {
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
          <AllMoviesPaginator
            catalogItems={catalogItems}
            savedMovies={savedMovies}
            handleOnLike={handleOnLike}
          />
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

// PAGINATOR ////////////////////////////////////////////////////////
export interface IAllMoviesPaginatorProps {
  catalogItems: IMovieItem[];
  savedMovies: IMySavedMoviesResponse[];
  handleOnLike: (id: string | number) => Promise<void>;
}

export const AllMoviesPaginator: React.FC<IAllMoviesPaginatorProps> = ({
  catalogItems,
  savedMovies,
  handleOnLike,
}) => {
  const [offsetPag, setOffsetPag] = useState(0);
  const currScreen = useAllMoviesPaginatorScreenSize();

  const calcPaginationDiff = useCallback(
    (initialCount: number, incrementByCount: number, offset: number) => [
      ...[...catalogItems].splice(0, initialCount - incrementByCount),
      ...[...catalogItems].splice(
        initialCount - incrementByCount,
        incrementByCount + offset * incrementByCount,
      ),
    ],
    [catalogItems],
  );

  const catalogItemsPaginable = useMemo(() => {
    const [initialCount, incrementByCount] = SIZES[currScreen];
    return calcPaginationDiff(initialCount, incrementByCount, offsetPag);
  }, [catalogItems, offsetPag, currScreen]);

  const handleLoadMore = useCallback(() => {
    setOffsetPag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (currScreen) {
      setOffsetPag(0);
    }
  }, [currScreen, catalogItems]);

  const noMore = catalogItems.length === catalogItemsPaginable.length;

  return (
    <div className={styles.savedMoviesPage__catalog}>
      <div className={styles["savedMoviesPage__catalog-wrapper"]}>
        {catalogItemsPaginable.map((props) => (
          <MovieCard
            key={props.id}
            id={props.id}
            title={props.nameRU}
            image={buildUrl(props.image.url)}
            duration={props.duration}
            onLike={handleOnLike}
            link={props.trailerLink}
            isAdded={savedMovies.findIndex((x) => x.movieId === props.id) > -1}
          />
        ))}
      </div>
      {!noMore && (
        <footer className={styles["savedMoviesPage__catalog-footer"]}>
          <Button
            color="blue"
            onClick={handleLoadMore}
            className={styles["savedMoviesPage__catalog-loadmore"]}
          >
            Загрузить ещё
          </Button>
        </footer>
      )}
    </div>
  );
};
