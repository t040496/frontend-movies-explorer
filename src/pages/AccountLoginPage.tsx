import React, { useCallback, useContext } from "react";
import styles from "./AccountLoginPage.module.scss";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import logoPath from "../images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import cn from "classnames";
import { useSnackbar } from "notistack";
import { myProfile, signIn } from "api/mainApi";
import { useAsyncFn } from "react-use";
import { CurrentUserCtx } from "App";

export type TLoginFormValues = {
  email: string;
  password: string;
};

export const AccountLoginPage = () => {
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

  const formMethods = useForm<TLoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = formMethods;

  const isFormInvalid = !isValid || !isDirty;

  const handleFormSubmit = useCallback(async (formData: TLoginFormValues) => {
    try {
      await signInTrigger(formData);

      const userProfile = await myProfile();
      setCurrUserProfile(userProfile);

      navigate("/movies");
    } catch (e: any) {
      enqueueSnackbar(e.message, {
        variant: "error",
      });
    }
  }, []);

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
      <h3 className="bold-500">Рады видеть!</h3>
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
        disabled={signInQuery.loading || isFormInvalid}
        className={styles.accountLoginPage__submitBtn}
      >
        Войти
      </Button>
      <footer className="txt-center">
        <span className="color-light">Еще не зарегистрированы?</span>{" "}
        <NavLink to="/signup" className="color-blue">
          Регистрация
        </NavLink>
      </footer>
    </form>
  );
};
