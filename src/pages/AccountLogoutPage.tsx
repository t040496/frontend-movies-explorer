import { signOut } from "api/mainApi";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { purgeStorage } from "utils/storage";

export const AccountLogoutPage = () => {
  const [isLoggedOut, setLoggedOut] = useState<boolean>(false);

  const logout = useCallback(async () => {
    try {
      await signOut();

      purgeStorage();
      setLoggedOut(true);
    } catch (e: any) {}
  }, []);

  useEffect(() => {
    logout();
  }, []);

  if (!isLoggedOut) {
    return <span>Выход...</span>;
  }

  return <Navigate to="/signin" />;
};
