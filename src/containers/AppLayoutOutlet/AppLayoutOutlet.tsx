import React, { useContext, useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styles from "./AppLayoutOutlet.module.scss";
import logoPath from "../../images/logo.svg";
import burgerIconPath from "../../images/burger.svg";
import cn from "classnames";
import { AccountButton } from "../../components/AccountButton/AccountButton";
import { MenuSidebar } from "components/MenuSidebar/MenuSidebar";
import { createContext } from "react";
import { Button } from "components/Button/Button";
import { CurrentUserCtx } from "App";

export type TMenuSidebarCtx = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export const MenuSidebarCtx = createContext<TMenuSidebarCtx>([
  false,
  () => null,
]);

export const AppLayoutOutlet = () => {
  const [currUserProfile] = useContext(CurrentUserCtx);
  const menuSidebarStateDispatch = useState<boolean>(false);
  const [, setSidebarShown] = menuSidebarStateDispatch;

  const navigate = useNavigate();
  const location = useLocation();

  const isMainPage = location.pathname === "/";
  const isPublicRoute = ["/signin", "/signup"].includes(location.pathname);

  const isProtectedRoute = [
    "/profile",
    "/profile/edit",
    "/profile/signout",
    "/saved-movies",
    "/movies",
  ].includes(location.pathname);

  const isNotAuth = currUserProfile && !Object.keys(currUserProfile).length;
  const isAuth = currUserProfile && Object.keys(currUserProfile).length;

  if (isNotAuth && isProtectedRoute) {
    return <Navigate to="/" />;
  }

  if (isAuth && isPublicRoute) {
    return <Navigate to="/" />;
  }

  return (
    <MenuSidebarCtx.Provider value={menuSidebarStateDispatch}>
      <div className={styles.pageContainer}>
        {!isPublicRoute && (
          <header
            className={cn(
              styles.pageContainer__header,
              isMainPage && styles["pageContainer__header-background"],
              "page-section",
            )}
          >
            {!isNotAuth ? (
              <div className="flexbox flexbox-wide flexbox-gap-5 flexbox-spacebetween-x flexbox-center-y">
                <NavLink to="/">
                  <img
                    src={logoPath}
                    alt="Logo"
                    className={styles.pageContainerProtected__logo}
                  />
                </NavLink>
                <nav className={styles.pageContainerProtected__navigation}>
                  <ul className="links-list">
                    <li>
                      <NavLink to="movies">Фильмы</NavLink>
                    </li>
                    <li>
                      <NavLink to="saved-movies">Сохраненные фильмы</NavLink>
                    </li>
                  </ul>
                </nav>
                <button
                  className={cn(
                    "clean-style",
                    styles.pageContainerProtected__menuButton,
                  )}
                  onClick={() => setSidebarShown(true)}
                >
                  <img src={burgerIconPath} alt="Burger" />
                </button>
                <AccountButton
                  className={styles.pageContainerProtected__accountButton}
                />
              </div>
            ) : (
              <>
                <NavLink to="/">
                  <img src={logoPath} alt="Logo" />
                </NavLink>
                <div className={styles.pageContainer__authBox}>
                  <Button responsive onClick={() => navigate("/signup")}>
                    Регистрация
                  </Button>
                  <Button
                    responsive
                    onClick={() => navigate("/signin")}
                    color="blue"
                  >
                    Войти
                  </Button>
                </div>
              </>
            )}
          </header>
        )}
        <main
          className={cn(styles.pageContainer__main, "page-container-content")}
        >
          <Outlet />
        </main>
        {!isPublicRoute && (
          <footer
            className={cn(
              styles.pageContainer__footer,
              !isMainPage && styles.pageContainerProtected__footer,
              "page-section",
            )}
          >
            <span className="light-color">
              Учебный проект Яндекс.Практикум х BeatMovie.
            </span>
            <div className={styles.pageContainer__footerWrapper}>
              <span>&copy; 2020</span>
              <ul className="links-list">
                <li>
                  <a href="https://practicum.yandex.ru/" target="_blank">
                    Яндекс.Практикум
                  </a>
                </li>
                <li>
                  <a href="https://github.com/t040496/" target="_blank">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        )}
        <MenuSidebar />
      </div>
    </MenuSidebarCtx.Provider>
  );
};
