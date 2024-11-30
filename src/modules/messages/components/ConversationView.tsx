import { Button, Tooltip, Typography } from "antd";
import { useConversation } from "../conversationContext";
import { BiFile, BiSolidSend } from "react-icons/bi";
import { useCallback, useEffect, useRef, useState } from "react";
import { RiCloseFill, RiFileFill, RiUserFill } from "react-icons/ri";
import { create, uniqueId } from "lodash";
import Cookies from "js-cookie";

import {
  useGetListMessages,
  Message,
  useMutateSendMessage,
} from "../conversationActions";
import Pusher from "pusher-js";
import { useQueryClient } from "@tanstack/react-query";
import { COOKIE_EMPLOYER_ID, COOKIE_USER_ID } from "../../employer";
import { usePuser } from "../pusherContext";

export const ConversationView = () => {
  return (
    <div className="flex flex-col">
      <ConversationHeader />
      <ConversationContent />
      <ConversationInput />
    </div>
  );
};

const ConversationHeader = () => {
  const { currentConversation } = useConversation();
  return (
    <div className="flex items-center gap-3 border-b p-2">
      <img
        src={currentConversation?.logo}
        alt={currentConversation?.name}
        className="h-12 w-12 rounded-full border"
      />
      <Tooltip title={currentConversation?.name}>
        <Typography.Text ellipsis>{currentConversation?.name}</Typography.Text>
      </Tooltip>
    </div>
  );
};

const ConversationContent = () => {
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLUListElement>(null);
  const { pusher } = usePuser();
  const { currentConversation, messages, updateMessages } = useConversation();
  const { data: listMessage } = useGetListMessages(currentConversation?.id);
  const scrollToEnd = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (listMessage?.length) {
      updateMessages(listMessage);
    }
  }, [listMessage, updateMessages]);
  useEffect(() => {
    if (!currentConversation?.id || !pusher) return;
    const userId = parseInt(Cookies.get(COOKIE_USER_ID) ?? "");
    const employerId = parseInt(Cookies.get(COOKIE_EMPLOYER_ID) ?? "");
    const channel = pusher.subscribe(`chat.${userId || employerId}`);
    channel.bind("MessageSent", (data: Message) => {
      updateMessages(messages?.length ? [...messages, data] : [data]);
    });
    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, [currentConversation?.id, messages, pusher, updateMessages]);
  useEffect(() => {
    scrollToEnd();
    queryClient.invalidateQueries({
      queryKey: ["list-conversations"],
    });
  }, [messages, queryClient]);
  return (
    <ul
      ref={containerRef}
      className="flex h-[calc(100vh-175px)] flex-col gap-2 overflow-auto"
    >
      {messages?.map((message) => (
        <MessageItem key={uniqueId("test")} {...message} />
      ))}
    </ul>
  );
};

const MessageItem = (props: Message) => {
  const userId = parseInt(Cookies.get(COOKIE_USER_ID) ?? "");
  const employerId = parseInt(Cookies.get(COOKIE_EMPLOYER_ID) ?? "");

  return (
    <li
      className={`m-2 flex flex-col ${props.sender_id == userId || props.sender_id == employerId ? "items-end" : "items-start"} `}
    >
      <div className="flex items-center gap-2 text-gray-500">
        <RiUserFill />
        <Typography.Text className="text-gray-500">
          {props.sender_name}
        </Typography.Text>
      </div>

      <div className="flex w-fit flex-col rounded-xl bg-blue-500 p-2">
        {props.file_url && (
          <a
            href={props.file_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-teal-500"
          >
            <RiFileFill />
            <Typography.Text className="text-teal-500">File</Typography.Text>
          </a>
        )}
        <Typography.Text className="text-white">
          {props.message}
        </Typography.Text>
        <Typography.Text className="pl-6 text-end text-[8px] text-white">
          {props.created_at}
        </Typography.Text>
      </div>
    </li>
  );
};

const ConversationInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const { currentConversation, updateMessages, messages } = useConversation();
  const { mutate, isPending } = useMutateSendMessage();

  const onAttachFile = useCallback(() => {
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    input?.click();
  }, []);

  const onSendMessage = useCallback(() => {
    const isHaveMessage = value.trim().length > 0;

    if (!currentConversation?.id || !isHaveMessage || isPending) return;
    mutate(
      {
        receiverId: currentConversation.id,
        message: value,
        attachment,
      },
      {
        onSuccess: (data) => {
          setValue("");
          setAttachment(null);
          const newMessage = {
            ...data,
            created_at: new Date().toLocaleString(),
          };
          updateMessages(
            messages?.length ? [...messages, newMessage] : [newMessage],
          );
        },
      },
    );
  }, [
    value,
    currentConversation?.id,
    isPending,
    mutate,
    attachment,
    updateMessages,
    messages,
  ]);

  // update attachment state when user select file
  useEffect(() => {
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    input?.addEventListener("change", () => {
      if (input.files && input.files.length) {
        setAttachment(input.files[0]);
      }
    });
    return () => {
      input?.removeEventListener("change", () => {
        if (input.files && input.files.length) {
          setAttachment(input.files[0]);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "Enter" &&
          !event.shiftKey &&
          document.activeElement !== inputRef.current) ||
        (event.key === "Enter" &&
          event.shiftKey &&
          document.activeElement === inputRef.current)
      ) {
        event.preventDefault();

        const isHaveMessage = value.trim().length > 0;

        if (!isHaveMessage || isPending) return;
        onSendMessage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPending, onSendMessage, value]);

  return (
    <div className="relative flex h-14">
      <input type="file" hidden name="attachment" multiple={false} />
      <Button
        disabled={isPending}
        onClick={onAttachFile}
        icon={<BiFile color="#1677ff" />}
        className="h-full rounded-md"
        type="text"
        variant="text"
      />
      {attachment && (
        <div className="absolute -top-2 left-6 flex -translate-y-full justify-center rounded-lg bg-blue-200 p-2 py-3">
          <Button
            size="small"
            type="text"
            color="default"
            className="absolute -top-1 right-0"
            onClick={() => setAttachment(null)}
            disabled={isPending}
            icon={<RiCloseFill />}
          />
          <RiFileFill />
          <Typography.Text className="text-xs">
            {attachment.name}
          </Typography.Text>
        </div>
      )}
      <textarea
        disabled={isPending}
        className="w-full rounded-md border p-2"
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        style={{ resize: "none" }}
      />
      <Button
        loading={isPending}
        onClick={onSendMessage}
        icon={<BiSolidSend color="#1677ff" />}
        className="h-full rounded-md"
        type="text"
        variant="text"
      />
    </div>
  );
};
