import { CurrentUserCtx } from "App";
import { signOut } from "api/mainApi";
import { useSnackbar } from "notistack";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { wait } from "utils/helpers";
import { purgeStorage } from "utils/storage";

export const AccountLogoutPage = () => {
  const [isLoggedOut, setLoggedOut] = useState<boolean>(false);
  const [, setCurrUserProfile] = useContext(CurrentUserCtx);
  const { enqueueSnackbar } = useSnackbar();

  const logout = useCallback(async () => {
    try {
      await signOut();
      setCurrUserProfile(null);

      purgeStorage();
    } catch (e: any) {
      enqueueSnackbar(e.message, {
        variant: "error",
      });
    } finally {
      await wait(1000);
      setLoggedOut(true);
    }
  }, []);

  useEffect(() => {
    logout();
  }, []);

  if (!isLoggedOut) {
    return <span>Выход...</span>;
  }

  return <Navigate to="/signin" />;
};
