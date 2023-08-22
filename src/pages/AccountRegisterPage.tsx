import React, { useCallback, useContext } from "react";
import styles from "./AccountLoginPage.module.scss";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import logoPath from "../images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { myProfile, signIn, signUp } from "api/mainApi";
import { useAsyncFn } from "react-use";
import { TLoginFormValues } from "./AccountLoginPage";
import { CurrentUserCtx } from "App";

export type TRegisterFormValues = {
  email: string;
  password: string;
  name: string;
};

export const AccountRegisterPage = () => {
  const [signUpQuery, signUpTrigger] = useAsyncFn(
    async (formData: TRegisterFormValues) => {
      const response = await signUp(formData);
      return response;
    },
    [],
  );

  const [signInQuery, signInTrigger] = useAsyncFn(
    async (formData: TLoginFormValues) => {
      const response = await signIn(formData);
      return response;
    },
    [],
  );

  const [, setCurrUserProfile] = useContext(CurrentUserCtx);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const formMethods = useForm<TRegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = formMethods;

  const isFormInvalid = !isValid || !isDirty;

  const handleFormSubmit = useCallback(
    async (formData: TRegisterFormValues) => {
      try {
        await signUpTrigger(formData);
        await signInTrigger(formData);

        const userProfile = await myProfile();
        setCurrUserProfile(userProfile);

        navigate("/movies");
      } catch (e: any) {
        enqueueSnackbar(e.message, {
          variant: "error",
        });
      }
    },
    [],
  );

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn(styles.accountLoginPage, "page-section")}
    >
      <NavLink to="/">
        <img
          src={logoPath}
          alt="Logo"
          className={styles.accountLoginPage__logo}
        />
      </NavLink>
      <h3 className="bold-500">Добро пожаловать!</h3>
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Поле не должно быть пустым",
          },
          maxLength: {
            value: 20,
            message: "Слишком длинное имя",
          },
          minLength: {
            value: 2,
            message: "Слишком короткое имя",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Имя"
            type="text"
            isControlled
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Поле не должно быть пустым",
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Введите корректный email",
          },
          maxLength: {
            value: 50,
            message: "Слишком длинный email",
          },
          minLength: {
            value: 5,
            message: "Слишком короткий email",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            isControlled
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Поле не должно быть пустым",
          },
          maxLength: {
            value: 15,
            message: "Слишком длинный пароль",
          },
          minLength: {
            value: 8,
            message: "Слишком короткий пароль",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Пароль"
            type="password"
            isControlled
            error={errors.password?.message}
          />
        )}
      />
      <Button
        wide
        color="blue"
        disabled={signUpQuery.loading || signInQuery.loading || isFormInvalid}
        className={styles.accountLoginPage__submitBtn}
      >
        Зарегистрироваться
      </Button>
      <footer className="txt-center">
        <span className="color-light">Уже зарегистрированы?</span>{" "}
        <NavLink to="/signin" className="color-blue">
          Войти
        </NavLink>
      </footer>
    </form>
  );
};
