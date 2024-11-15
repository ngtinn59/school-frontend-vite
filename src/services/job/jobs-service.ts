import axios from "axios";
import { BASE_URL_API } from "../../utils/constants";

export const getUrgentJobs = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/list-jobs/urgent`);
  return response.data;
};

export const getJobDetail = async (id: string | undefined) => {
  const response = await axios.get(`${BASE_URL_API}/api/list-jobs/${id}`);
  return response.data;
};
