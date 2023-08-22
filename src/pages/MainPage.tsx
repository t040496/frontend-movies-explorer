import React from "react";
import styles from "./MainPage.module.scss";
import cn from "classnames";
import { Progress } from "../components/Progress/Progress";
import { Block } from "../components/Block/Block";
import myPhotoPath from "../images/myphoto.jpg";

const technologiesArr = [
  "HTML",
  "CSS",
  "JS",
  "React",
  "Git",
  "Express.js",
  "mongoDB",
];

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <div
        className={cn(
          styles.mainPage__banner,
          styles["mainPage__banner-responsive-480--30"],
        )}
      >
        <span>Учебный проект студента факультета Веб-разработки.</span>
      </div>
      <nav className={styles.mainPage__navigation}>
        <ul className="links-list responsive-480--11">
          <li>
            <a href="#about-project">О проекте</a>
          </li>
          <li>
            <a href="#technologies">Технологии</a>
          </li>
          <li>
            <a href="#about-me">Студент</a>
          </li>
        </ul>
      </nav>
      <section
        id="about-project"
        className={cn(
          styles.mainPage__pageSection,
          styles["mainPage__pageSection-aboutProject"],
          styles["mainPage__pageSection-light"],
          "page-section",
        )}
      >
        <h4
          className={cn(
            styles.mainPage__pageSection__title,
            "responsive-480--18",
          )}
        >
          О проекте
        </h4>
        <div className="columns">
          <div className="col col-2">
            <h5 className="responsive-480--18">
              Дипломный проект включал 5 этапов
            </h5>
            <p className="responsive-768--12 responsive-480--11">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="col col-2">
            <h5 className="responsive-480--18 ">
              На выполнение диплома ушло 5 недель
            </h5>
            <p className="responsive-768--12 responsive-480--11">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="margin-9-top">
          <Progress value={23} labelUsed="1 неделя" labelUnused="4 недели" />
          <Progress
            value={23}
            labelUsed="Back-end"
            labelUnused="Front-end"
            transparent
          />
        </div>
      </section>
      <section
        id="technologies"
        className={cn(
          styles["mainPage__pageSection-technologies"],
          styles.mainPage__pageSection,
          styles["mainPage__pageSection-gray"],
          "page-section",
        )}
      >
        <h4
          className={cn(
            styles.mainPage__pageSection__title,
            "responsive-480--18",
          )}
        >
          Технологии
        </h4>
        <h1 className="txt-center responsive-480--30">7 технологий</h1>
        <p className="txt-center max-width-480 margin-center responsive-768--12 responsive-480--11">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="flexbox flexbox-center flexbox-wrapped flexbox-gap-1 margin-9-top">
          {technologiesArr.map((x) => (
            <Block className="responsive-768--12" key={x}>
              {x}
            </Block>
          ))}
        </div>
      </section>
      <section
        id="about-me"
        className={cn(
          styles.mainPage__pageSection,
          styles["mainPage__pageSection-aboutMe"],
          styles["mainPage__pageSection-light"],
          "page-section",
        )}
      >
        <h4 className={styles.mainPage__pageSection__title}>Студент</h4>
        <div className="columns">
          <div className="col col-3-2">
            <h1 className="non-top-margin responsive-680--30">Тимур</h1>
            <h6 className="responsive-768--12 responsive-320--11">
              Фронтенд-разработчик, 27 лет
            </h6>
            <p className="max-width-580 responsive-768--12 responsive-320--11">
              Привет, я Тимур из города Уфа. Мне 27 лет. После школы я поступил
              в педагогический университет им. М. Акмуллы. Закончив его, пошел
              работать в общеобразовательную школу учителем обществознания и
              права. В прошлом году возникла идея поменять профессию, выучившись
              на фронтенд-разработчика. Так, я оказался здесь, в Яндекс.
              Практикуме.
            </p>
            <div className="margin-5-top">
              <a href="https://github.com/t040496/" target="_blank">
                GutHub
              </a>
            </div>
          </div>
          <div className="col col-3 txt-right">
            <img
              className={styles.mainPage__myphoto}
              src={myPhotoPath}
              alt="My Photo"
            />
          </div>
        </div>
        <h6 className="light-variant margin-9-top responsive-480--14">
          Портфолио
        </h6>
        <ul
          className={cn(
            styles.mainPage__folio,
            styles["mainPage__folio-responsive-768--28"],
            styles["mainPage__folio-responsive-480--18"],
          )}
        >
          <li>
            <a
              href="https://t040496.github.io/how-to-learn-project/"
              target="_blank"
            >
              <span>Статичный сайт</span>
              <span>↗</span>
            </a>
          </li>
          <li>
            <a href="https://t040496.github.io/russian-travel/" target="_blank">
              <span>Адаптивный сайт</span>
              <span>↗</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/t040496/react-mesto-api-full-gha"
              target="_blank"
            >
              <span>Одностраничное приложение</span>
              <span>↗</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};
