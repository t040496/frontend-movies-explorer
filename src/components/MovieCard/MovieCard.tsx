import React, { MouseEvent, useCallback } from "react";
import styles from "./MovieCard.module.scss";
import { convertDur } from "utils/helpers";
import cn from "classnames";
import crossIconPath from "../../images/cross.svg";

export interface IMovieCardProps {
  id: string | number;
  title: string;
  duration: number;
  image: string;
  isAdded?: boolean;
  link?: string;
  onLike?: (id: string | number) => void;
  onRemove?: (id: string | number) => void;
}

export const MovieCard: React.FC<IMovieCardProps> = ({
  title,
  duration,
  image,
  isAdded,
  id,
  onLike,
  onRemove,
  link,
}) => {
  const time = convertDur(duration);

  const handleOnLike = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (onLike) {
        onLike(id);
      }
    },
    [id, onLike],
  );

  const handleOnRemove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (onRemove) {
        onRemove(id);
      }
    },
    [id, onRemove],
  );

  return (
    <a className={styles.movieCard} href={link || "#"} target="_blank">
      <header
        className={styles.movieCard__thumb}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></header>
      <section className={styles.movieCard__body}>
        <div className={styles.movieCard__titleWrapper}>
          <h5 className={styles.movieCard__title}>{title}</h5>
          <div className={styles.movieCard__time}>{time || "Неизвестное"}</div>
        </div>
        {!onRemove ? (
          <div
            onClick={handleOnLike}
            className={cn(
              styles.movieCard__statusDot,
              isAdded && styles["movieCard__statusDot-added"],
            )}
          />
        ) : (
          <img
            onClick={handleOnRemove}
            src={crossIconPath}
            className={styles.movieCard__removeBtn}
            alt="Cross"
          />
        )}
      </section>
    </a>
  );
};
