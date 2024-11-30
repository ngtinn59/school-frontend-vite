import { useMutation, useQuery } from "@tanstack/react-query";
import { COMMON_API_ROUTES } from "./constants.ts";
import { axiosInstance } from "../../utils/baseAxios.ts";

export type CompanyApplied = {
  id: number;
  name: string;
  logo: string;
};

export const useGetListCompanyApplied = (userId?: number) => {
  return useQuery({
    queryKey: ["list-company-applied", userId],
    queryFn: async () => {
      const listCompanyAppliedResponse = await axiosInstance.get(
        COMMON_API_ROUTES.LIST_COMPANY_APPLIED_FOR_JOB_SEEKER,
      );
      return listCompanyAppliedResponse.data?.data as CompanyApplied[];
    },
    enabled: !!userId,
  });
};

export const useGetListApplicants = (employerId?: number) => {
  return useQuery({
    queryKey: [COMMON_API_ROUTES.LIST_EMPLOYER_CONVERSATIONS, employerId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        COMMON_API_ROUTES.LIST_EMPLOYER_CONVERSATIONS,
      );
      return response.data?.data;
    },
    enabled: !!employerId,
  });
};

export const useMutateSendMessage = () => {
  return useMutation({
    mutationFn: async ({
      receiverId,
      message,
      attachment,
    }: {
      receiverId: number;
      message: string;
      attachment?: File | null;
    }) => {
      const formData = new FormData();
      formData.append("receiver_id", receiverId.toString());
      formData.append("message", message);
      if (attachment) {
        formData.append("file", attachment);
      }
      const response = await axiosInstance.post(
        COMMON_API_ROUTES.SEND_MESSAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data.data;
    },
  });
};

export type Conversation = {
  email: string;
  id: number;
  last_message: string;
  last_message_time: string;
  logo: string;
  name: string;
};

export const useGetListConversations = (userId?: number) => {
  return useQuery({
    queryKey: ["list-conversations", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        COMMON_API_ROUTES.LIST_CONVERSATIONS,
      );
      return response.data?.data as Conversation[];
    },
    enabled: !!userId,
  });
};

export type Message = {
  message: string;
  created_at: string;
  id: number;
  receiver_id: number;
  sender_id: number;
  sender_name: string;
  file_url: string;
};

export const useGetListMessages = (conversationId?: number) => {
  return useQuery({
    queryKey: ["list-messages", conversationId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        COMMON_API_ROUTES.CONVERSATION_DETAIL.replace(
          ":id",
          conversationId!.toString(),
        ),
      );
      return response.data?.data as Message[];
    },
    enabled: !!conversationId,
  });
};

export const useGetListConversationForEmployer = (userId?: number) => {
  return useQuery({
    queryKey: ["list-conversations-employer", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        COMMON_API_ROUTES.LIST_CONVERSATION_FOR_EMPLOYER,
      );
      return response.data?.data as Conversation[];
    },
    enabled: !!userId,
  });
};
