import { BASE_URL_API } from "../../../utils/constants";
import { axiosInstance } from "../../../utils/baseAxios";

export const getAllProfileSaved = async () => {
  const response = await axiosInstance.get(
    `${BASE_URL_API}/api/employer/candidates/saved`
  );
  return response.data;
};

export const unSaveProfile = async (id: number) => {
  const response = await axiosInstance.delete(
    `${BASE_URL_API}/api/employer/candidates/un-save/${id}`
  );
  return response.data;
};

export const getInformationResume = async (id: number) => {
  const response = await axiosInstance.get(
    `${BASE_URL_API}/api/employer/saved-candidates/${id}`
  );
  return response.data;
};
