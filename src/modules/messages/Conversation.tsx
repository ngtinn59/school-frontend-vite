import { ListCompanyApplied } from "./components/ListCompanyApplied.tsx";
import { ListConversations } from "./components/ListConversations.tsx";
import { ConversationView } from "./components/ConversationView.tsx";
import { useSelector } from "react-redux";
import { useConversation } from "./conversationContext.tsx";
import { useEffect } from "react";
import { RootState } from "../../app/store.ts";
import {
  useGetListConversationForEmployer,
  useGetListConversations,
} from "./conversationActions.ts";
import { COOKIE_EMPLOYER_ID, COOKIE_USER_ID } from "../employer/index.ts";
import Cookies from "js-cookie";

export const ConversationPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const isUser = Cookies.get(COOKIE_USER_ID);
  const isEmployer = Cookies.get(COOKIE_EMPLOYER_ID);
  const employer = useSelector((state: RootState) => state.employer);
  const { data: conversations } = useGetListConversations(user?.id);
  const { data: employerConversations } = useGetListConversationForEmployer(
    employer?.profile?.id,
  );

  const { updateConversations } = useConversation();

  useEffect(() => {
    if (isUser) updateConversations(conversations);
    if (isEmployer) updateConversations(employerConversations);
  }, [
    conversations,
    employerConversations,
    isEmployer,
    isUser,
    updateConversations,
  ]);

  return (
    <div className="flex h-full pt-2">
      <div className="h-full w-3/12 border-r p-2">
        <ListConversations />
      </div>
      <div className="w-6/12">
        <ConversationView />
      </div>
      <div className="h-full w-3/12 border-l p-2">
        <ListCompanyApplied />
      </div>
    </div>
  );
};
