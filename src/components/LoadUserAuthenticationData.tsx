import { AxiosError, isAxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  getAboutMeApi,
  getAwardApi,
  getCertificateApi,
  getEducationApi,
  getPersonalProjectApi,
  getSkillApi,
  getUserInformationApi,
  getUserProfileApi,
  getWorkExperienceApi,
} from "../services/api/profileApi";
import {
  signIn,
  updateUserInformation,
  updateUserProfile,
} from "../services/redux/user";
import { LoaderLoginResponse } from "../utils/type";

export default function LoadUserAuthenticationData({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const loginData: LoaderLoginResponse = useLoaderData() as LoaderLoginResponse;
  useEffect(() => {
    if (loginData.isLogin) {
      dispatch(
        signIn({
          token: loginData.token,
          token_type: loginData.token_type,
          name: loginData.name,
        })
      );
    } else {
      dispatch(
        signIn({
          token: "",
          token_type: "",
          name: "",
        })
      );
    }
  }, [loginData, loginData.isLogin, dispatch]);

  useEffect(() => {
    // Call api to get user information
    if (loginData.isLogin) {
      getUserInformationApi()
        .then((res) => {
          dispatch(updateUserInformation(res.data));
        })
        .catch((err) => {
          if (isAxiosError(err)) {
            const axiosErr = err as AxiosError;
            if (axiosErr.response && axiosErr.response.data) {
              toast.error(
                "Failed to fetch user information: " +
                  //@ts-expect-error  Property 'message' does not exist on type '{}'.ts(2339)
                  axiosErr.response.data.message
              );
            } else {
              toast.error(
                "Failed to fetch user information: An unexpected error occurred."
              );
            }
          } else {
            toast.error(
              "Failed to fetch user information: An unexpected error occurred."
            );
          }
        });

      // Cal api to get user profile
      const aboutMePromise = getAboutMeApi().catch((err) =>
        toast.error("Error when get 'about me' data: " + err)
      );
      const educationPromise = getEducationApi().catch((err) =>
        toast.error("Error when get 'education' data: " + err)
      );
      const workExperiencePromise = getWorkExperienceApi().catch((err) =>
        toast.error("Error when get 'work experience' data: " + err)
      );
      const personalProjectsPromise = getPersonalProjectApi().catch((err) =>
        toast.error("Error when get 'personal projects' data: " + err)
      );
      const certificatePromise = getCertificateApi().catch((err) =>
        toast.error("Error when get 'certificates' data: " + err)
      );
      const awardPromise = getAwardApi().catch((err) =>
        toast.error("Error when get 'awards' data: " + err)
      );
      const userProfilePromise = getSkillApi().catch((err) =>
        toast.error("Error when get 'skills' data: " + err)
      );
      getUserProfileApi(
        aboutMePromise,
        educationPromise,
        workExperiencePromise,
        personalProjectsPromise,
        certificatePromise,
        awardPromise,
        userProfilePromise
      )
        .then((res) => {
          dispatch(updateUserProfile(res));
        })
        .catch((err) =>
          toast.error("Error when get user profile data: " + err)
        );
    }
  }, []);
  return <>{children}</>;
}
