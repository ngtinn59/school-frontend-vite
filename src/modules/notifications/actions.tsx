import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/baseAxios";

export const useGetNotifications = (userId: number) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`api/notifications`);
      return response.data as {
        id: number;
        message: string;
        read_at: string;
        read: string;
        created_at: string;
      }[];
    },
    enabled: !!userId,
  });
};

export const useGetNotificationsEmployer = (employerId: number) => {
  return useQuery({
    queryKey: ["notifications", "employer", employerId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `api/employer/companies/notifications`,
      );
      return response.data as {
        id: number;
        message: string;
        read_at: string;
        read: string;
        created_at: string;
      }[];
    },
    enabled: !!employerId,
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notification_id: number) => {
      await axiosInstance.post(`api/notifications/${notification_id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useReadNotificationEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notification_id: number) => {
      return await axiosInstance.post(
        `api/employer/companies/notifications/read`,
        {
          notification_id,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notification_id: number) => {
      await axiosInstance.delete(`api/notifications/${notification_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useDeleteNotificationEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notification_id: number) => {
      await axiosInstance.delete(
        `api/employer/companies/notifications/${notification_id}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
