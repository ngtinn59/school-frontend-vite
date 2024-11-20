import axios from "axios";
import { generateConfig } from "./common";
import { BASE_URL_API } from "../../utils/constants";

export const getUserCVsApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${BASE_URL_API}/api/jobs/user/cvs`, config);
  return response.data;
};
