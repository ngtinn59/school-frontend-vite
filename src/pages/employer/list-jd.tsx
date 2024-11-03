import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Space, Table } from "antd";
import { EMPLOYER_BE_API, EMPLOYER_ROUTES } from "../../modules";
import { axiosInstance } from "../../utils/baseAxios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ListJD = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [EMPLOYER_BE_API.LIST_JD, "list"],
    queryFn: async () => {
      return await axiosInstance.get(EMPLOYER_BE_API.LIST_JD);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [EMPLOYER_BE_API.DELETE_JD],
    mutationFn: async (id: any) => {
      return await axiosInstance.delete(
        EMPLOYER_BE_API.DELETE_JD.replace(":id", id)
      );
    },
    onSuccess: () => {
      toast.success("job description deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [EMPLOYER_BE_API.LIST_JD, "list"],
      });
    },
  });

  const { mutate: T, isPending: LT } = useMutation({
    mutationKey: [`api/job/toggle`],
    mutationFn: async (id: any) => {
      return await axiosInstance.post(`api/:id/toggle`.replace(":id", id));
    },
    onSuccess: () => {
      toast.success("job description update status");
      queryClient.invalidateQueries({
        queryKey: [EMPLOYER_BE_API.LIST_JD, "list"],
      });
    },
  });

  const loading = isPending || LT || isLoading || isRefetching;

  const navigate = useNavigate();

  const columns = [
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 300,
      render(value: any) {
        return value === 1 ? "open" : "close";
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() =>
              navigate(EMPLOYER_ROUTES.EDIT_JD.replace(":id", record.id))
            }
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              mutate(record.id);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              T(record.id);
            }}
          >
            {record.status === 1 ? "Close JD" : "Open JD"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="px-4 mb-5 sm:px-0 flex justify-between">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          List Job Description
        </h3>

        <Button
          className="!bg-[#1677ff]"
          type="primary"
          onClick={() => navigate(EMPLOYER_ROUTES.CREATE_JD)}
        >
          Create JD
        </Button>
      </div>

      <Table
        rowKey="id"
        scroll={{
          x: 1440,
        }}
        loading={loading}
        dataSource={data?.data.data ?? []}
        columns={columns}
      />
    </div>
  );
};
