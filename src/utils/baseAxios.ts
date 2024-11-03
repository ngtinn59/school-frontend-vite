import axios from "axios";
import { BASE_URL_API } from "./constants";
import { COOKIE_ACCESS_TOKEN } from "../modules";
import Cookies from "js-cookie";
export const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(COOKIE_ACCESS_TOKEN);
    const accessTokenJob = Cookies.get("token");

    config.headers.Authorization = `Bearer ${accessToken || accessTokenJob}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
