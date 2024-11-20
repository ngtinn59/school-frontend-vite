import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JobSeekerRoute } from "../constants/routes.constant";
import { axiosInstance } from "../../../utils/baseAxios";
import { Button, message, Space, Table, TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { BASE_URL_API } from "../../../utils/constants";
import Buttons from "../../../pages/job/components/job-info/common/Buttons";
import SaveButton from "../../../pages/job/components/job-info/common/buttons/SaveButton";
import ApplyButton from "../../../pages/job/components/job-info/common/buttons/ApplyButton";

export const JobList = () => {
  const { data: JobList, isLoading } = useQuery({
    queryKey: [JobSeekerRoute.jobList],
    queryFn: async () => {
      return await axiosInstance.get("api/list-jobs");
    },
    select(data) {
      return data.data.data.jobs;
    },
  });
  console.log(JobList);

  // const { data: JobsApply } = useQuery({
  //   queryKey: ["job-apply"],
  //   queryFn: async () => {
  //     return await axiosInstance.get("api/jobs/applied");
  //   },
  //   select(data) {
  //     return data.data.data.map((i: any) => i.id);
  //   },
  // });

  // const { mutate: applyJob, isPending: aLoading } = useMutation({
  //   mutationKey: ["apply-job"],
  //   mutationFn: async (id: string) => {
  //     const responseAxios = await axios.get(`${BASE_URL_API}/api/download-cv`, {
  //       responseType: "blob",
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get("token")}`,
  //       },
  //     });

  //     const blobUrl = URL.createObjectURL(responseAxios.data);
  //     const response = await fetch(blobUrl);
  //     const blob = await response.blob();

  //     const file = new File([blob], new Date().getTime().toString() + ".pdf", {
  //       type: "application/pdf",
  //     });

  //     const formData = new FormData();
  //     formData.append("cv", file);

  //     return axiosInstance.post(`api/jobs/${id}/apply`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data;",
  //       },
  //     });
  //   },
  //   onSuccess() {
  //     message.success("Apply job successfully");
  //     queryClient.invalidateQueries({
  //       queryKey: ["job-apply"],
  //     });
  //   },
  //   onError() {
  //     message.error("Apply job failed");
  //   },
  // });

  // const navigate = useNavigate();

  // const { data: favorites } = useQuery({
  //   queryKey: ["api/favorites/saved-jobs"],
  //   queryFn: async () => {
  //     return await axiosInstance.get("api/jobs/favorites/saved");
  //   },
  //   select(data) {
  //     return data.data.data;
  //   },
  // });

  // const { mutate: favorite, isPending: bLoading } = useMutation({
  //   mutationFn: async (id) => {
  //     return await axiosInstance.post(`api/jobs/favorites/${id}/save`);
  //   },
  //   onSuccess() {
  //     message.success("Save job successfully");
  //   },
  //   onError() {
  //     message.error("Save job failed");
  //   },
  // });

  // const { mutate: unFavorite, isPending: cLoading } = useMutation({
  //   mutationFn: async (id) => {
  //     return await axiosInstance.post(`api/jobs/favorites/${id}/unsave`);
  //   },
  //   onSuccess() {
  //     message.success("un-save job successfully");
  //   },
  //   onError() {
  //     message.error("un-save job failed");
  //   },
  // });

  // const loading = aLoading || bLoading || cLoading;

  const columns: TableColumnsType<any> = [
    {
      align: "center",
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (value: any) => {
        return (
          <div className="flex flex-col items-center">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={value.logo}
              alt={value.name}
            />
            <p className="text-balance text-center">{value.name}</p>
          </div>
        );
      },
      width: 100,
    },
    {
      title: "Title",
      align: "center",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (value: any) => {
        return (
          <div>
            <p className="text-balance text-center text-base font-semibold text-[var(--color-primary)]">
              {value}
            </p>
          </div>
        );
      },
    },
    {
      align: "center",
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      width: 200,
      render: (value: any) => {
        return (
          <div className="font-semibold text-green-600">
            ${(value.salary_from / 23000).toLocaleString()} - $
            {(value.salary_to / 23000).toLocaleString()}
          </div>
        );
      },
    },
    {
      align: "center",
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 50,
      render: (value: any) => {
        return <div>{value.name}</div>;
      },
    },
    {
      align: "center",
      title: "Last Date",
      dataIndex: "last_date",
      key: "last_date",
      width: 80,
      render: (value: any) => {
        return <div className="text-red-500">{value}</div>;
      },
    },
    {
      align: "center",
      title: "Action",
      dataIndex: "id",
      width: 100,
      render: (value: any) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <ApplyButton jobId={value} />
            <SaveButton jobId={value} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="mx-auto mt-5 max-w-[1440px]">
      <div className="mb-5 flex justify-between px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Job List
        </h3>
      </div>

      <Table
        scroll={{
          x: 1440,
        }}
        rowKey="id"
        // loading={loading || isLoading}
        loading={isLoading}
        dataSource={JobList ?? []}
        columns={columns}
      />
    </div>
  );
};
