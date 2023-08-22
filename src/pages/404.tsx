import React from "react";
import styles from "./404.module.scss";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundPage}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <a
        onClick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
      >
        Назад
      </a>
    </div>
  );
};
