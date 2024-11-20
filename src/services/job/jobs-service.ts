import axios from "axios";
import { BASE_URL_API } from "../../utils/constants";
import { generateConfig } from "../api/common";

export const getUrgentJobs = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/list-jobs/urgent`);
  return response.data;
};

export const getJobDetail = async (id: string | undefined) => {
  const config = await generateConfig();
  const response = await axios.get(
    `${BASE_URL_API}/api/list-jobs/${id}`,
    config,
  );
  return response.data;
};

export const getSearchJobs = async (searchQuery: string) => {
  const config = await generateConfig();
  const response = await axios.get(
    `${BASE_URL_API}/api/jobs/search?${searchQuery}`,
    config,
  );
  return response.data;
};
