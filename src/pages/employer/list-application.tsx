import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EMPLOYER_BE_API } from "../../modules";
import { axiosInstance } from "../../utils/baseAxios";
import { Space, Table, TableColumnsType, Button } from "antd";
import toast from "react-hot-toast";

export const ListApplication = () => {
  const { data: applications, isLoading } = useQuery({
    queryKey: [EMPLOYER_BE_API.LIST_APPLICATION, "list"],
    queryFn: async () => {
      return await axiosInstance.get(EMPLOYER_BE_API.LIST_APPLICATION);
    },
    select(data) {
      return data.data.data;
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["api/processApplication/:jobId/:applicationId"],
    mutationFn: async (values: any) => {
      try {
        return axiosInstance.post(
          "api/processApplication/:jobId/:applicationId"
            .replace(":jobId", values.jobId)
            .replace(":applicationId", values.applicationId),
          {
            status: values.status,
          }
        );
      } catch (error: any) {
        if (error.response.data.error) {
          Object.values(error.response.data.error).forEach((err) => {
            toast.error(err as string);
          });
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Approve application successfully");
      queryClient.invalidateQueries({
        queryKey: [EMPLOYER_BE_API.LIST_APPLICATION, "list"],
      });
    },
  });

  const loading = isPending || isLoading;

  const columns: TableColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Total Applicants",
      dataIndex: "applicants",
      key: "applicants",
      render(value) {
        return value ? value.length : 0;
      },
    },
    {
      title: "Last Date",
      dataIndex: "last_date",
      key: "last_date",
    },
  ];

  const expandedRowRender = (value: any) => {
    const columns: TableColumnsType<any> = [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Status", dataIndex: "status", key: "status" },
      {
        title: "Action",
        key: "operation",
        render: (_, record) => (
          <Space size="middle">
            {record.status !== "approved" && (
              <Button
                onClick={() =>
                  mutate(
                    {
                      jobId: value.id,
                      applicationId: record.id,
                      status: "approved",
                    },
                    {
                      onSuccess() {
                        queryClient.invalidateQueries({
                          queryKey: [EMPLOYER_BE_API.LIST_APPLICATION, "list"],
                        });
                      },
                    }
                  )
                }
              >
                Approve
              </Button>
            )}
            <a target="_blank" href={record.cv}>
              <Button>View Cv</Button>
            </a>
          </Space>
        ),
      },
    ];

    return (
      <Table
        rowKey="key"
        columns={columns}
        dataSource={value.applicants}
        pagination={false}
      />
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="px-4 mb-5 sm:px-0 flex justify-between">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          List Application
        </h3>
      </div>

      <Table
        loading={loading}
        rowKey="id"
        dataSource={applications ?? []}
        expandable={{
          expandedRowRender,
          rowExpandable(record) {
            return record.applicants ? record.applicants.length > 0 : false;
          },
        }}
        columns={columns}
      />
    </div>
  );
};
