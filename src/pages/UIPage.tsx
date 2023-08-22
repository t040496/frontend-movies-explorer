import React from "react";
import styles from "./UIPage.module.scss";
import MovieCard from "../components/MovieCard";
import { Button } from "../components/Button/Button";
import { Block } from "../components/Block/Block";
import { Input } from "../components/Input/Input";
import cn from "classnames";
import { Progress } from "../components/Progress/Progress";
import { Switch } from "../components/Switch/Switch";
import { SearchBar } from "../components/SearchBar/SearchBar";

export const UIPage = () => {
  return (
    <div className={styles.uikitPage}>
      <h2>UIKit</h2>
      <div className={styles.uikitPage__wrapper}>
        <h4>Одна карточка</h4>
        <div className={styles.uikitPage__collectionWrapper}>
          <MovieCard
            id="1"
            title="33 слова о дизайне"
            duration={120}
            image=""
          />
        </div>
        <h4>Несколько карточек</h4>
        <div className={styles.uikitPage__collectionWrapper}>
          <MovieCard
            id="1"
            title="33 слова о дизайне"
            duration={250}
            image=""
          />
          <MovieCard
            id="1"
            title="Звездные войны"
            duration={185}
            image=""
            isAdded
          />
          <MovieCard
            id="1"
            title="Слово о мече и магии"
            duration={158}
            image=""
          />
        </div>
        <h4>Кнопка</h4>
        <Button color="blue" onClick={() => console.log("нажата кнопка")}>
          Кнопка
        </Button>
        <h4>Коллекция кнопок</h4>
        <div className={styles.uikitPage__collectionWrapper}>
          <Button color="blue" onClick={() => console.log("нажата кнопка")}>
            Кнопка
          </Button>
          <Button onClick={() => console.log("нажата кнопка")}>Кнопка</Button>
        </div>
        <h4>Плашка</h4>
        <div className={styles.uikitPage__collectionWrapper}>
          <Block>HTML</Block>
        </div>
        <h4>Плашки</h4>
        <div className={styles.uikitPage__collectionWrapper}>
          <Block>HTML</Block>
          <Block>CSS</Block>
          <Block>JS</Block>
          <Block>React</Block>
        </div>
        <h4>Поле ввода</h4>
        <div className={styles.uikitPage__collectionWrapper}>
          <Input name="field1" onTextInput={(value) => console.log(value)} />
        </div>
        <h4>Коллекция полей ввода</h4>
        <form
          className={cn(
            styles.uikitPage__collectionWrapper,
            styles["uikitPage__collectionWrapper-col"],
          )}
          style={{ maxWidth: 300 }}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);

            console.log(data.get("field1"));
          }}
        >
          <Input name="name" label="Имя" />
          <Input name="email" label="Email" />
          <Input name="password" label="Пароль" />
          <Button color="blue">Войти</Button>
        </form>
        <h4>Прогресс-бар</h4>
        <Progress value={32} labelUsed="32%" />
        <h4>Тумблер</h4>
        <Switch />
        <h4>Поиск</h4>
        <SearchBar
          onSearch={(value) => console.log(value)}
          onSwitchShort={(value) => console.log(value)}
        />
      </div>
    </div>
  );
};
