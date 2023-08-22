import React, { useContext } from "react";
import styles from "./AccountPage.module.scss";
import { capitalizeWord } from "../helpers";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { CurrentUserCtx } from "App";

const fieldsMap: Record<string, string> = {
  email: "email",
  name: "Имя",
};

export const AccountPage = () => {
  const [profileData] = useContext(CurrentUserCtx);

  return (
    <div className={cn(styles.accountPage, "page-section")}>
      {profileData ? (
        <>
          <h5>Привет, {profileData.name}!</h5>
          <div className={styles.accountPage__userSummary}>
            {Object.entries(profileData)
              .filter(([label]) => fieldsMap[label])
              .map(([label, value]) => (
                <div
                  className={styles.accountPage__userSummary__row}
                  key={label}
                >
                  <div className={styles.accountPage__userSummary__label}>
                    {capitalizeWord(fieldsMap[label])}
                  </div>
                  <div className={styles.accountPage__userSummary__value}>
                    {value}
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.accountPage__manage}>
            <NavLink to="/profile/edit">Редактировать</NavLink>
            <NavLink
              to="/profile/signout"
              className={styles.accountPage__logoutLink}
            >
              Выйти из аккаунта
            </NavLink>
          </div>
        </>
      ) : (
        <span>Загрузка...</span>
      )}
    </div>
  );
};
