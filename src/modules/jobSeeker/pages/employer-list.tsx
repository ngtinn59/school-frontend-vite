import { useQuery } from "@tanstack/react-query";
import {
  JobSeekerApiRoute,
  JobSeekerRoute,
} from "../constants/routes.constant";
import { axiosInstance } from "../../../utils/baseAxios";
import { Button, Space, Table, TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";

export const EmployerList = () => {
  const { data: employerList, isLoading } = useQuery({
    queryKey: [JobSeekerRoute.employerList],
    queryFn: async () => {
      return await axiosInstance.get(JobSeekerApiRoute.employerList);
    },
    select(data) {
      return data.data.data;
    },
  });

  const navigate = useNavigate();

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 100,
    },
    {
      title: "Total Job",
      dataIndex: "jobs",
      key: "jobs",
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      width: "50px",
      render(_: any, record: any) {
        return (
          <Space size="middle">
            <Button
              onClick={() =>
                navigate(
                  JobSeekerRoute.employerDetail.replace(":id", record.id)
                )
              }
            >
              Detail
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="mt-5 max-w-[1024px] mx-auto">
      <div className="px-4 mb-5 sm:px-0 flex justify-between">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Employer List
        </h3>
      </div>

      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={employerList ?? []}
        columns={columns}
      />
    </div>
  );
};
