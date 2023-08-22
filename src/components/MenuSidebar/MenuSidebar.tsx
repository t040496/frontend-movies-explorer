import React, { useContext } from "react";
import styles from "./MenuSidebar.module.scss";
import crossIconPath from "../../images/cross.svg";
import cn from "classnames";
import { MenuSidebarCtx } from "containers/AppLayoutOutlet/AppLayoutOutlet";
import { NavLink } from "react-router-dom";
import { AccountButton } from "components/AccountButton/AccountButton";

export interface IMenuSidebarProps {}

export const MenuSidebar: React.FC<IMenuSidebarProps> = () => {
  const [menuSidebarState, setMenuSidebarState] = useContext(MenuSidebarCtx);

  return (
    <div
      className={cn(
        styles.menuSidebar,
        menuSidebarState && styles["menuSidebar_shown"],
      )}
    >
      <div className={styles.menuSidebar__body}>
        <button
          onClick={() => setMenuSidebarState(false)}
          className={cn(styles.menuSidebar__closeButton, "clean-style")}
        >
          <img src={crossIconPath} alt="Cross" />
        </button>
        <nav
          className={styles["menuSidebar__body-wrapper"]}
          onClick={() => setMenuSidebarState(false)}
        >
          <ul>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Фильмы</NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies">Сохраненные фильмы</NavLink>
            </li>
          </ul>
        </nav>
        <AccountButton onClick={() => setMenuSidebarState(false)} />
      </div>
    </div>
  );
};
