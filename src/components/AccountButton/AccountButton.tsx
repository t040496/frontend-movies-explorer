import React, { useCallback } from "react";
import styles from "./AccountButton.module.scss";
import accountIconPath from "../../images/account-icon.svg";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

export interface IAccountButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const AccountButton: React.FC<IAccountButtonProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      navigate("/profile");

      if (props.onClick) {
        props.onClick(e);
      }
    },
    [props.onClick],
  );

  return (
    <button
      {...props}
      className={cn(props.className, styles.accountButton)}
      onClick={handleClick}
    >
      <img src={accountIconPath} alt="Account" />
      <span>Аккаунт</span>
    </button>
  );
};
