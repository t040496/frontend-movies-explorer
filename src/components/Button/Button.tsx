import React from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "default";
  variant?: "circle" | "default";
  wide?: boolean;
  responsive?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
  wide,
  color = "default",
  variant = "default",
  responsive,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        styles.button,
        styles[`button-color-${color}`],
        styles[`button-variant-${variant}`],
        wide && styles[`button-wide`],
        disabled && styles[`button-disabled`],
        responsive && styles[`button-responsive`],
        props.className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
