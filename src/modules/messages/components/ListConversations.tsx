import { Spin, Tooltip, Typography } from "antd";
import { NewConversation, useConversation } from "../conversationContext.tsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";
import { useGetListCompanyApplied } from "../conversationActions.ts";

export const ListConversations = () => {
  return (
    <div className="flex h-full flex-col gap-3">
      <h1>Danh sách cuộc hội thoại</h1>
      <ConversationContainer />
    </div>
  );
};

const ConversationContainer = () => {
  const user = useSelector((state: RootState) => state.user);
  const { data: companies } = useGetListCompanyApplied(user.id);

  const { conversations, currentConversation } = useConversation();
  const [newConversation, setNewConversation] = useState<
    NewConversation | undefined
  >();

  useEffect(() => {
    const newConversationId = conversations?.every(
      (c) => c.id !== currentConversation?.id,
    )
      ? currentConversation?.id
      : undefined;

    if (newConversationId) {
      const newC = companies?.find((c) => c.id === newConversationId);
      if (newC) {
        setNewConversation({
          id: newC.id,
          name: newC.name,
          logo: newC.logo,
        });
      } else {
        setNewConversation(undefined);
      }
    }
  }, [companies, conversations, currentConversation]);

  if (!conversations) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {newConversation && (
        <ConversationItem key={newConversation.id} {...newConversation} />
      )}
      {conversations &&
        conversations
          .filter((c) => c.logo)
          .map((conversation) => (
            <ConversationItem key={conversation.id} {...conversation} />
          ))}
    </ul>
  );
};

type ConversationItemProps = {
  id: number;
  name: string;
  logo: string;
  last_message?: string;
};
const ConversationItem = ({
  id,
  name,
  logo,
  last_message,
}: ConversationItemProps) => {
  const { currentConversation, updateCurrentConversation } = useConversation();
  const [itemClass, setItemClass] = useState<string>("");

  const onConversationClick = () => {
    updateCurrentConversation({
      id,
      name,
      logo,
    });
  };

  useEffect(() => {
    if (currentConversation?.id === id) {
      setItemClass("bg-gray-200");
    } else {
      setItemClass("");
    }
  }, [currentConversation?.id, id]);

  return (
    <li
      onClick={onConversationClick}
      className={`flex cursor-pointer items-center gap-2 rounded-md p-1 ${itemClass}`}
    >
      <img src={logo} alt={name} className="h-12 w-12 rounded-full border" />
      <div className="flex max-w-[calc(100%-56px)] flex-col">
        <Tooltip title={name}>
          <Typography.Text className="text-sm" ellipsis>
            {name}
          </Typography.Text>
        </Tooltip>
        <Typography.Text ellipsis className="text-xs text-gray-500">
          {last_message}
        </Typography.Text>
      </div>
    </li>
  );
};
