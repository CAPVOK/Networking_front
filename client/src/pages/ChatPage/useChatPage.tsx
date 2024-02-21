import { useEffect, useRef } from "react";
import { useSelector } from "../../core/store";
import {
  selectMessageQueue,
  selectMessages,
  selectUser,
} from "../../core/store/slices/app.slice";

export const useChatPage = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  const chatMessages = useSelector(selectMessages);
  const messageQueue = useSelector(selectMessageQueue);
  const userName = useSelector(selectUser);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chatMessages, messageQueue]);

  const checkIsFirstMessage = (index: number) => {
    if (index === 0) return true;
    const currentDate = new Date(chatMessages[index].timestamp);
    const prevDate = new Date(chatMessages[index - 1].timestamp);
    console.log(currentDate.toDateString());
    console.log(prevDate.toDateString());
    return currentDate.toDateString() !== prevDate.toDateString();
  };

  return {
    chatMessages,
    userName,
    chatRef,
    checkIsFirstMessage,
    messageQueue,
  };
};
