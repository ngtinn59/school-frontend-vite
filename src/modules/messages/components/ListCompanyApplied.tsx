import { Tooltip, Typography, Button, Spin } from "antd";
import { useConversation } from "../conversationContext.tsx";
import {
  CompanyApplied,
  Message,
  useGetListApplicants,
  useGetListCompanyApplied,
} from "../conversationActions.ts";
import Cookies from "js-cookie";
import { COOKIE_EMPLOYER_ID, COOKIE_USER_ID } from "../../employer/index.ts";
import { useEffect, useState } from "react";

export const ListCompanyApplied = () => {
  const userId = parseInt(Cookies.get(COOKIE_USER_ID) ?? "");
  const employerId = parseInt(Cookies.get(COOKIE_EMPLOYER_ID) ?? "");

  const { data: companies, isLoading } = useGetListCompanyApplied(userId);
  const { data: applicants, isLoading: employerLoading } =
    useGetListApplicants(employerId);

  const [data, setData] = useState<CompanyApplied[]>([]);

  useEffect(() => {
    if (userId && Array.isArray(companies)) {
      setData(companies);
    }
    if (employerId) {
      setData(applicants);
    }
  }, [companies, applicants, userId, employerId]);

  return (
    <div className="flex h-full flex-col gap-3">
      <h1>
        {userId
          ? "Danh sách công ty ứng tuyển"
          : "Danh sách ứng viên ứng tuyển"}
      </h1>
      {isLoading || employerLoading ? (
        <div className="flex h-full items-center justify-center">
          <Spin />
        </div>
      ) : (
        <ul className="flex h-full flex-col gap-2">
          {data?.map((d: any) => (
            <li key={d.id}>
              <CompanyCard {...d} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type CompanyCardProps = {
  id: number;
  name: string;
  logo: string;
};

export const CompanyCard = ({ id, name, logo }: CompanyCardProps) => {
  const { updateCurrentConversation } = useConversation();

  const sendMessageHandler = () => {
    updateCurrentConversation({
      id,
      name,
      logo,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt={name} className="h-12 w-12 rounded-full border" />
      <Tooltip title={name}>
        <Typography.Text ellipsis>{name}</Typography.Text>
      </Tooltip>
      <Button
        onClick={sendMessageHandler}
        className="ml-auto"
        type="primary"
        color="primary"
        size="small"
      >
        Nhắn tin
      </Button>
    </div>
  );
};
