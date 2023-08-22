import React, { useCallback, useContext, useEffect } from "react";
import styles from "./AccountLoginPage.module.scss";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { updateProfile } from "api/mainApi";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { CurrentUserCtx } from "App";
import { useAsyncFn } from "react-use";

export type TEditFormValues = {
  email: string;
  name: string;
};

export const AccountEditPage = () => {
  const [profileData, setProfileData] = useContext(CurrentUserCtx);

  const [updateProfileQuery, updateProfileTrigger] = useAsyncFn(
    async (formData: TEditFormValues) => {
      const response = await updateProfile(formData);
      return response;
    },
    [],
  );

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formMethods = useForm<TEditFormValues>({
    defaultValues: {
      email: "",
      name: "",
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = formMethods;

  const isFormInvalid = !isValid || !isDirty;

  useEffect(() => {
    if (profileData) {
      reset(profileData);
    }
  }, [profileData]);

  const handleFormSubmit = useCallback(async (formData: TEditFormValues) => {
    try {
      const newProfileData = await updateProfileTrigger(formData);
      setProfileData(newProfileData);

      enqueueSnackbar("Профиль успешно обновлен", {
        variant: "success",
      });

      navigate("/profile");
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
      <h3 className="bold-500">Редактирование</h3>
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
      <Button
        wide
        color="blue"
        disabled={updateProfileQuery.loading || isFormInvalid}
        className={styles.accountLoginPage__submitBtn}
      >
        Сохранить
      </Button>
      <Button wide onClick={() => navigate("/profile")}>
        Отмена
      </Button>
    </form>
  );
};
