import React, { useEffect, useState } from "react";
import styles from "./Switch.module.scss";
import cn from "classnames";

export interface ISwitchProps {
  onSwitch?: (value: boolean) => void;
  defaulValue?: boolean;
}

export const Switch: React.FC<ISwitchProps> = ({
  onSwitch,
  defaulValue = false,
}) => {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    setValue(defaulValue);
  }, [defaulValue]);

  const handleOnClick = () => {
    setValue(!value);

    if (onSwitch) {
      onSwitch(!value);
    }
  };

  return (
    <div
      className={cn(styles.switch, value && styles["switch-on"])}
      onClick={handleOnClick}
    >
      <div className={styles.switch__dot} />
    </div>
  );
};
