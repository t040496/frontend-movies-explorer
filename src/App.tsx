import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.scss";
import { UIPage } from "./pages/UIPage";
import { withHocs } from "./hocs";
import { MainPage } from "./pages/MainPage";
import { NotFoundPage } from "./pages/404";
import { SavedMoviesPage } from "./pages/SavedMoviesPage";
import AppLayoutOutlet from "./containers/AppLayoutOutlet";
import { AccountPage } from "./pages/AccountPage";
import { AccountEditPage } from "./pages/AccountEditPage";
import { AccountLogoutPage } from "./pages/AccountLogoutPage";
import { AccountLoginPage } from "./pages/AccountLoginPage";
import { AccountRegisterPage } from "./pages/AccountRegisterPage";
import { AllMoviesPage } from "pages/AllMoviesPage";
import { createContext } from "react";
import { IMyProfileResponse } from "api/mainApi";
import { useAuth } from "hooks/useAuth";

export type TCurrentUserCtx = [
  Partial<IMyProfileResponse> | null,
  React.Dispatch<React.SetStateAction<Partial<IMyProfileResponse> | null>>,
];

export const CurrentUserCtx = createContext<TCurrentUserCtx>([
  null,
  () => null,
]);

const App = withHocs(() => {
  const profileDataDispatcher = useState<Partial<IMyProfileResponse> | null>(
    null,
  );
  const [, setCurrUserProfile] = profileDataDispatcher;
  const { profileData } = useAuth({ onlyCheck: true });

  useEffect(() => {
    if (profileData) {
      setCurrUserProfile(profileData);
    }
  }, [profileData]);

  if (!profileData) {
    return <div>Загрузка...</div>;
  }

  return (
    <CurrentUserCtx.Provider value={profileDataDispatcher}>
      <Routes>
        <Route path="/" element={<AppLayoutOutlet />}>
          <Route index element={<MainPage />} />
          <Route path="signin" element={<AccountLoginPage />} />
          <Route path="signup" element={<AccountRegisterPage />} />
          <Route path="uikit" element={<UIPage />} />
          <Route path="profile" element={<Outlet />}>
            <Route index element={<AccountPage />} />
            <Route path="edit" element={<AccountEditPage />} />
            <Route path="signout" element={<AccountLogoutPage />} />
          </Route>
          <Route path="saved-movies" element={<SavedMoviesPage />} />
          <Route path="movies" element={<AllMoviesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CurrentUserCtx.Provider>
  );
});

export default App;
