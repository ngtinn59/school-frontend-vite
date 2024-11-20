import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../../../utils/baseAxios";
import { Avatar, Button, Empty, List, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export const JobDetail = () => {
  const { id } = useParams();

  const { data: dataJob } = useQuery({
    queryKey: ["api/jobs/:id".replace(":id", id ?? "")],
    queryFn: async () => {
      return await axiosInstance.get("api/jobs/:id".replace(":id", id ?? ""));
    },
    select(data) {
      return data.data.data;
    },
  });

  const navigate = useNavigate();

  const renderProfile = () => {
    if (!dataJob) return <Empty />;

    const displayData: Record<string, any> = {
      country: { label: "title", value: dataJob?.job.title ?? "-" },
      city: { label: "description", value: dataJob?.job.description ?? "-" },
      address: {
        label: "salary",
        value:
          dataJob?.job.salary?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }) ?? "-",
      },
      webstie: {
        label: "address",
        value: dataJob?.job?.address ?? "-",
      },
      companyType: {
        label: "job type",
        value: dataJob?.job?.job_type ?? "-",
      },
      companySize: {
        label: "job city",
        value: dataJob?.job?.jobcity?.[0] ?? "-",
      },
      Working_days: {
        label: "skill experience",
        value: dataJob?.job?.skill_experience ?? "-",
      },
      Overtime_policy: {
        label: "skills",
        value: dataJob?.job?.skills ?? "-",
      },
      facebook: {
        label: "benefits",
        value: dataJob?.job?.benefits ?? "-",
      },
      last_date: {
        label: "lastdate",
        value: dataJob?.job?.last_date ?? "-",
      },
    };

    return Object.values(displayData).map((info) => {
      return (
        <div
          key={info.label}
          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt className="text-sm font-medium leading-6 text-gray-900">
            {info.label}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {info.value}
          </dd>
        </div>
      );
    });
  };

  return (
    <div className="mx-auto max-w-2xl pt-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Job Detail
        </h3>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">{renderProfile()}</dl>
      </div>

      <div className="my-5">
        <List
          header={<Typography.Title level={5}>Related Job</Typography.Title>}
          itemLayout="horizontal"
          dataSource={dataJob?.jobRecommendations ?? []}
          renderItem={(item: any, index) => (
            <List.Item
              className="!cursor-pointer"
              onClick={() =>
                navigate("/job/detail/:id".replace(":id", item.id))
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<Typography.Text>{item.title}</Typography.Text>}
                description={item.job_city?.[0]}
              />
            </List.Item>
          )}
        ></List>
      </div>

      <div className="flex justify-center">
        <Button onClick={() => navigate("/job/list")}> Back </Button>
      </div>
    </div>
  );
};
