import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Conversation, Message } from "./conversationActions";
import { useNavigate } from "react-router-dom";
import { COOKIE_EMPLOYER_ID, COOKIE_USER_ID } from "../employer";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export interface NewConversation {
  id: number;
  name: string;
  logo: string;
  last_message?: string;
}

interface ConversationContextProps {
  currentConversation: NewConversation | undefined;
  updateCurrentConversation: (currentConversation?: NewConversation) => void;

  conversations: Conversation[] | undefined;
  updateConversations: (conversations?: Conversation[]) => void;

  messages: Message[] | undefined;
  updateMessages: (messages?: Message[]) => void;
}

const ConversationContext = createContext<ConversationContextProps | undefined>(
  undefined,
);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const employer = useSelector((state: any) => state.employer);

  const [conversations, setConversations] = useState<Conversation[]>();
  const updateConversations = React.useCallback(
    (conversations?: Conversation[]) => {
      setConversations(conversations);
    },
    [],
  );

  const [currentConversation, setCurrentConversation] =
    useState<NewConversation>();
  const updateCurrentConversation = React.useCallback(
    (currentConversation?: NewConversation) => {
      setMessages([]);
      setCurrentConversation(currentConversation);
    },
    [],
  );

  const [messages, setMessages] = useState<Message[]>();
  const updateMessages = React.useCallback((messages?: Message[]) => {
    setMessages(messages);
  }, []);

  useEffect(() => {
    if (user.id && !Cookies.get(COOKIE_USER_ID)) {
      setConversations([]);
      navigate("/sign-in");
    }
    if (employer.id && !Cookies.get(COOKIE_EMPLOYER_ID)) {
      setConversations([]);
      navigate("/sign-in");
    }
  }, [employer.id, navigate, user.id]);

  return (
    <ConversationContext.Provider
      value={{
        currentConversation,
        updateCurrentConversation,
        conversations,
        updateConversations,
        messages,
        updateMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error(
      "useConversation must be used within a ConversationProvider",
    );
  }
  return context;
};
