import axios from "axios";
import { BASE_URL_API } from "../../utils/constants";
import { generateConfig } from "../api/common";

export const getUrgentJobs = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/list-jobs/urgent`);
  return response.data;
};

export const getJobDetail = async (id: string | undefined) => {
  const response = await axios.get(`${BASE_URL_API}/api/list-jobs/${id}`);
  return response.data;
};

export const applyJobApi = async (jobId: number, formData: FormData) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${BASE_URL_API}/api/jobs/${jobId}/apply`,
    formData,
    config,
  );
  return response.data;
};
