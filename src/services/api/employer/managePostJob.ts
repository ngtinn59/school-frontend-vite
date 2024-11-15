import { BASE_URL_API } from "../../../utils/constants";
import { axiosInstance } from "../../../utils/baseAxios";

export const getAllJobPosting = async () => {
  const response = await axiosInstance.get(
    `${BASE_URL_API}/api/employer/jobs/`
  );
  return response.data;
};

export const getPostJob = async (id: number) => {
  const response = await axiosInstance.get(
    `${BASE_URL_API}/api/employer/jobs/${id}`
  );
  return response.data;
};

export const createPostJob = async (data: any) => {
  const response = await axiosInstance.post(
    `${BASE_URL_API}/api/employer/jobs`,
    data
  );
  return response.data;
};

export const updatePostJob = async (id: number, data: any) => {
  const response = await axiosInstance.put(
    `${BASE_URL_API}/api/employer/jobs/${id}`,
    data
  );
  return response.data;
};

export const deletePostJob = async (id: number) => {
  const response = await axiosInstance.delete(
    `${BASE_URL_API}/api/employer/jobs/${id}`
  );
  return response.data;
};
