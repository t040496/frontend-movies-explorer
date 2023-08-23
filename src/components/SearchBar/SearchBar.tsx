import React, { useCallback, useState } from "react";
import styles from "./SearchBar.module.scss";
import searchIconPath from "../../images/search-icon.svg";
import searchIconWhitePath from "../../images/search-icon-white.svg";
import { Button } from "../Button/Button";
import { Switch } from "../Switch/Switch";
import cn from "classnames";

export interface ISearchBarProps {
  onSearch?: (value: string) => void;
  onSwitchShort?: (value: boolean) => void;
  defaultSearchValue?: string;
  defaultShortValue?: boolean;
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  onSearch,
  onSwitchShort,
  defaultSearchValue = null,
  defaultShortValue,
}) => {
  const [searchText, setSearchText] = useState<string | null>(
    defaultSearchValue,
  );
  const [hasError, setHasErrorState] = useState<boolean>(false);

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOnShort = (state: boolean) => {
    if (onSwitchShort) {
      onSwitchShort(state);
    }
  };

  const handleOnSearchTxt = useCallback(() => {
    if (onSearch) {
      if (searchText) {
        onSearch(searchText);
        setHasErrorState(false);
      } else {
        setHasErrorState(true);
      }
    }
  }, [searchText]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__wrapper}>
        <img src={searchIconPath} alt="Search" />
        <input
          type="text"
          placeholder="Фильм"
          onChange={handleOnSearch}
          value={searchText || ""}
        />
        <Button color="blue" variant="circle" onClick={handleOnSearchTxt}>
          <img src={searchIconWhitePath} alt="Search" />
        </Button>
        <div
          className={cn(
            styles["searchBar__switch-container"],
            styles["searchBar__switch-container_inside"],
          )}
        >
          <div className={styles.searchBar__divider} />
          <Switch onSwitch={handleOnShort} defaulValue={defaultShortValue} />
          <span className={styles["searchBar__switch-label"]}>
            Короткометражки
          </span>
        </div>
        {hasError && (
          <div className={styles.searchBar__error}>
            Нужно ввести ключевое слово
          </div>
        )}
      </div>
      <div
        className={cn(
          styles["searchBar__switch-container"],
          styles["searchBar__switch-container_outside"],
        )}
      >
        <div className={styles.searchBar__divider} />
        <Switch onSwitch={onSwitchShort} defaulValue={defaultShortValue} />
        <span className={styles["searchBar__switch-label"]}>
          Короткометражки
        </span>
      </div>
    </div>
  );
};
