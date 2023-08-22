import React, { useMemo } from "react";
import styles from "./Progress.module.scss";
import cn from "classnames";

export interface IProgressProps {
  value?: number;
  labelUsed?: string;
  labelUnused?: string;
  transparent?: boolean;
}

export const Progress: React.FC<IProgressProps> = ({
  value = 50,
  labelUnused,
  labelUsed,
  transparent,
}) => {
  const width = useMemo<string>(() => {
    if (value < 0) {
      value = 0;
    }

    if (value > 100) {
      value = 100;
    }

    return `${value}%`;
  }, [value]);

  return (
    <div
      className={cn(
        styles.progress,
        styles["progress-responsive-480--11"],
        transparent && styles["progress-transparent"],
      )}
    >
      <div
        className={cn(styles.progress__body, styles.progress__rect)}
        style={{
          width,
        }}
      >
        {labelUsed && <span>{labelUsed}</span>}
      </div>
      <div className={cn(styles.progress__unused, styles.progress__rect)}>
        {labelUnused && <span>{labelUnused}</span>}
      </div>
    </div>
  );
};
