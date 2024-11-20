import { useQuery } from "@tanstack/react-query";
import { Table, TableColumnsType } from "antd";
import { axiosInstance } from "../../../utils/baseAxios";
import { JobSeekerRoute } from "../constants/routes.constant";

export const JobSaved = () => {
  const { data: JobSaved, isLoading } = useQuery({
    queryKey: [JobSeekerRoute.jobSaved],
    queryFn: async () => {
      return await axiosInstance.get("api/jobs/favorites/saved");
    },
    select(data) {
      return data.data.data;
    },
  });
  console.log(JobSaved);

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
      width: 100,
      render: (value: any) => {
        return (
          <div className="font-semibold text-green-600">
            {value.salary_from.toLocaleString()} VND -{" "}
            {value.salary_to.toLocaleString()} VND
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
    // {
    //   align: "center",
    //   title: "Action",
    //   dataIndex: "id",
    //   width: 150,
    //   render: (value: any) => {
    //     return (
    //       <div className="flex items-center justify-center gap-4">
    //         <ApplyButton jobId={value} />
    //         <SaveButton jobId={value} />
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="mx-auto mt-5 max-w-[1440px]">
      <div className="mb-5 flex justify-between px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Job Saved
        </h3>
      </div>

      <Table
        scroll={{
          x: 1440,
        }}
        rowKey="id"
        // loading={loading || isLoading}
        loading={isLoading}
        dataSource={JobSaved ?? []}
        columns={columns}
      />
    </div>
  );
};
