import { BASE_URL_API } from "../../../utils/constants";
import { axiosInstance } from "../../../utils/baseAxios";

export interface IJobPostingRes {
  id: number;
  title: string;
  applicant_count: number;
}

export interface IApplicant {
  id: number;
  name: string;
  email: string;
  status: string;
  cv: string;
}

export interface IDataApplicantOfJobRes {
  id: number;
  title: string;
  created_at: string;
  applicants: IApplicant[];
}

export const initialDataApplicantOfJobRes: IDataApplicantOfJobRes = {
  id: 0,
  title: "",
  created_at: "",
  applicants: [],
};

export const statusHiring = {
  HIRED: "hired",
  NOT_HIRED: "not_selected",
  TESTED: "test_round",
  INTERVIEWED: "interview",
  CONTACTED: "contacted",
};

export interface IDataSendMailReq {
  subject: string;
  message: string;
}

interface IDataRecruitApplicantReq {
  status: string;
}

export const getAllApplications = async () => {
  const response = await axiosInstance.get(`${BASE_URL_API}/api/applications/`);
  return response.data;
};

export const showListApplications = async (id: number) => {
  const response = await axiosInstance.get(
    `${BASE_URL_API}/api/applications/${id}`
  );
  return response.data;
};

export const sendMailToApplicant = async (
  jobId: number,
  userId: number,
  data: IDataSendMailReq
) => {
  const response = await axiosInstance.post(
    `${BASE_URL_API}/api/jobs/${jobId}/applicants/${userId}/send-email`,
    data
  );
  return response.data;
};

export const deleteApplication = async (jobId: number, userId: number) => {
  const response = await axiosInstance.delete(
    `${BASE_URL_API}/api/jobs/${jobId}/applicants/${userId}`
  );
  return response.data;
};

export const processStatusApplicant = async (
  jobId: number,
  userId: number,
  data: IDataRecruitApplicantReq
) => {
  const response = await axiosInstance.post(
    `${BASE_URL_API}/api/process-application/${jobId}/${userId}`,
    data
  );
  return response.data;
};
