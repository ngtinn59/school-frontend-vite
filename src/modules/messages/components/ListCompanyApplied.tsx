import { useSelector } from "react-redux";
import { Tooltip, Typography, Button, Spin } from "antd";
import { useConversation } from "../conversationContext.tsx";
import { useGetListCompanyApplied } from "../conversationActions.ts";
import { RootState } from "../../../app/store.ts";

export const ListCompanyApplied = () => {
  const user = useSelector((state: RootState) => state.user);

  const { data: companies, isLoading } = useGetListCompanyApplied(user.id);

  return (
    <div className="flex h-full flex-col gap-3">
      <h1>Danh sách công ty ứng tuyển</h1>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Spin />
        </div>
      ) : (
        <ul className="flex h-full flex-col gap-2">
          {companies?.map((company) => (
            <li key={company.id}>
              <CompanyCard
                key={company.id}
                id={company.id}
                name={company.name}
                logo={company.logo}
              />
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
