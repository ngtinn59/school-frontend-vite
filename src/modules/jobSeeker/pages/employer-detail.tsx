import { useQuery } from "@tanstack/react-query";
import {
  JobSeekerApiRoute,
  JobSeekerRoute,
} from "../constants/routes.constant";
import { axiosInstance } from "../../../utils/baseAxios";
import { Avatar, Button, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export const EmployerDetail = () => {
  const { id } = useParams();

  const { data: employer } = useQuery({
    queryKey: [JobSeekerRoute.employerDetail.replace(":id", id ?? "")],
    queryFn: async () => {
      return await axiosInstance.get(
        JobSeekerApiRoute.employerDetail.replace(":id", id ?? "")
      );
    },
    select(data) {
      return data.data.data;
    },
  });

  const navigate = useNavigate();

  const renderProfile = () => {
    if (!employer) return <Empty />;

    const displayData: Record<string, any> = {
      country: { label: "country", value: employer.country ?? "-" },
      city: { label: "city", value: employer.city ?? "-" },
      address: { label: "address", value: employer.address ?? "-" },
      webstie: {
        label: "webstie",
        value: (
          <a href={employer?.webstie ?? ""} target="_blank">
            {employer?.webstie ?? "-"}
          </a>
        ),
      },
      companyType: {
        label: "company type",
        value: employer.company_type ?? "-",
      },
      companySize: {
        label: "company size",
        value: employer.company_size ?? "-",
      },
      Working_days: {
        label: "working days",
        value: employer.Working_days ?? "-",
      },
      Overtime_policy: {
        label: "overtime policy",
        value: employer.Overtime_policy ?? "-",
      },
      facebook: {
        label: "facebook",
        value: (
          <a href={employer?.facebook ?? ""} target="_blank">
            {employer?.facebook ?? "-"}
          </a>
        ),
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
    <div className="max-w-2xl mx-auto pt-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Employer Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          details and information.
        </p>
      </div>

      <div>
        <Avatar
          size={100}
          src={
            <img
              src={
                employer?.logo ??
                `https://avatar.iran.liara.run/username?username=${employer?.name?.slice(
                  0
                )}+${employer?.name?.slice(1)}`
              }
              alt="avatar"
            />
          }
        />
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">{renderProfile()}</dl>
      </div>

      <div className="flex justify-center">
        <Button onClick={() => navigate(-1)}> Back </Button>
      </div>
    </div>
  );
};
