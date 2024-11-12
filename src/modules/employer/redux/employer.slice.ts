import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { EmployerProfileType } from "../../../utils/type";
import { COOKIE_ACCESS_TOKEN } from "../constants/cookie.constant";

type TInitialState = {
  isLogin: boolean;
  profile?: EmployerProfileType;
};

const initialState: TInitialState = {
  isLogin: false,
};

export const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    setLogin: (state, actions) => {
      return { ...state, isLogin: actions.payload };
    },
    setProfile: (state, actions) => {
      return { ...state, profile: { ...state.profile, ...actions.payload } };
    },
    logout: () => {
      Cookies.remove(COOKIE_ACCESS_TOKEN);
      return { isLogin: false };
    },
  },
});

export const employerActions = employerSlice.actions;
