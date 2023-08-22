import React from "react";
import styles from "./Block.module.scss";
import cn from "classnames";

export interface IBlockProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Block: React.FC<React.PropsWithChildren<IBlockProps>> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(styles.block, styles[`block-${props.className}`])}
    >
      {children}
    </div>
  );
};
