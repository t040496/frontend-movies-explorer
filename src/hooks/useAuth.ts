import { IMyProfileResponse, myProfile } from "api/mainApi";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

export interface IUseAuthHookProps {
  onlyCheck?: boolean;
}

export interface IUserAuthHookReturn {
  profileData: Partial<IMyProfileResponse> | null;
  isLoaded?: boolean;
}

export const useAuth = (props?: IUseAuthHookProps): IUserAuthHookReturn => {
  const location = useLocation();
  const [isLoaded, setLoadedState] = useState<boolean>(false);

  const [profileData, setProfileData] =
    useState<Partial<IMyProfileResponse> | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const onlyCheck = props?.onlyCheck;

  const fetchProfile = useCallback(async () => {
    setLoadedState(false);

    try {
      const queryData = await myProfile();
      setProfileData(queryData);
    } catch (e: any) {
      setProfileData({});

      if (!onlyCheck) {
        enqueueSnackbar(e.message, {
          variant: "error",
        });
      }
    } finally {
      setLoadedState(true);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [location.pathname]);

  return {
    profileData,
    isLoaded,
  };
};
