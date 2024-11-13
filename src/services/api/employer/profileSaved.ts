import { BASE_URL_API } from "../../../utils/constants";
import { axiosInstance } from "../../../utils/baseAxios";
import { IMailReq } from "../../../pages/employer/profile-saved";

export const getAllProfileSaved = async () => {
  const response = await axiosInstance.get(
    `${BASE_URL_API}/api/employer/candidates/saved`
  );
  return response.data;
};

export const saveProfile = async (id: number) => {
  const response = await axiosInstance.post(
    `${BASE_URL_API}/api/employer/candidates/save/${id}`
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
    `${BASE_URL_API}/api/resume/objectives/showCandidate/${id}`
  );
  return response.data;
};

export const sendMailToCandidate = async (id: number, data: IMailReq) => {
  const response = await axiosInstance.post(
    `${BASE_URL_API}/api/employer/candidates/${id}/send-email?=&=`,
    data
  );
  return response.data;
};

export const getAllProfileQuery = async (query: string) => {
  const response = await axiosInstance.get(
    `${BASE_URL_API}/api/resume/objectives/search?${query}`
  );
  return response.data;
};
