import { useQuery } from "@tanstack/react-query";
import { TableColumnsType, Table } from "antd";
import { axiosInstance } from "../../../utils/baseAxios";

export const JobsApply = () => {
  const { data: JobsApply, isLoading } = useQuery({
    queryKey: ["job-apply"],
    queryFn: async () => {
      return await axiosInstance.get("api/jobs/applied");
    },
    select(data) {
      return data.data.data;
    },
  });

  const columns: TableColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
      key: "description",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (value: any) => {
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
      width: 300,
    },
    {
      title: "Job City",
      dataIndex: "city",
      key: "city",
      width: 300,
    },
    {
      title: "Skill Experience",
      dataIndex: "skill_experience",
      key: "skill_experience",
      width: 300,
    },
    {
      title: "Benefits",
      dataIndex: "benefits",
      width: 300,
      key: "benefits",
    },
    {
      title: "Last Date",
      dataIndex: "last_date",
      key: "last_date",
      width: 300,
    },
  ];
  return (
    <div className="mt-5 max-w-[1440px] mx-auto">
      <div className="px-4 mb-5 sm:px-0 flex justify-between">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Job Applied
        </h3>
      </div>

      <Table
        scroll={{
          x: 1440,
        }}
        rowKey="id"
        loading={isLoading}
        dataSource={JobsApply ?? []}
        columns={columns}
      />
    </div>
  );
};
