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

export const getSearchJobs = async (
  cityId: string,
  professionId: string,
  keyword: string,
) => {
  const config = await generateConfig();
  const response = await axios.get(`${BASE_URL_API}/api/jobs/search`, {
    ...config,

    params: {
      city_id: cityId,
      profession_id: professionId,
      keyword: keyword,
    },
  });

  return response.data;
};

export const applyJobApi = async (jobId: string, formData: FormData) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${BASE_URL_API}/api/jobs/${jobId}/apply`,
    formData,
    config,
  );
  return response.data;
};

export const saveJobApi = async (jobId: string) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${BASE_URL_API}/api/jobs/favorites/${jobId}/save`,
    {},
    config,
  );
  return response.data;
};

export const unSaveJobApi = async (jobId: string) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${BASE_URL_API}/api/jobs/favorites/${jobId}/un-save`,
    {},
    config,
  );
  return response.data;
};
