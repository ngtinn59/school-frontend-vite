import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { COOKIE_ACCESS_TOKEN } from "../constants/cookie.constant";

type TInitialState = {
  isLogin: boolean;
  profile?: {
    id: number;
    country: string | null;
    city: string | null;
    companyType: string | null;
    companySize: string | null;
    name: string | null;
    Working_days: string | null;
    Overtime_policy: string | null;
    webstie: string | null;
    logo: string | null;
    facebook: string | null;
    address: string | null;
    description: string | null;
  };
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
