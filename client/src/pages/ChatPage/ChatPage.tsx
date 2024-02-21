import styled from "@emotion/styled";
import { useChatPage } from "./useChatPage";
import { MessageGroup } from "../../components";
import { InputBlock, NavBar } from "../../modules";
import { Typography } from "@mui/material";

const ChatPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Chat = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
`;

const CenterBlock = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatPage = () => {
  const {
    chatMessages,
    userName,
    checkIsFirstMessage,
    /* messageQueue, */ chatRef,
  } = useChatPage();

  return (
    <ChatPageWrapper>
      <NavBar />
      <Chat ref={chatRef}>
        {!userName ? (
          <CenterBlock>
            <Typography variant="h6" textAlign="center" component="p">
              Войдите в систему
            </Typography>
          </CenterBlock>
        ) : (
          <>
            {chatMessages.map((messageData, index) => (
              <MessageGroup
                key={index}
                isFirstMessage={checkIsFirstMessage(index)}
                isUserMessage={userName === messageData.sender}
                msg={messageData.message}
                sender={messageData.sender}
                time={messageData.timestamp}
                isError={messageData.error}
                isLoading={messageData.isLoading}
              />
            ))}
            {/*  {messageQueue.map((messageData, index) => (
              <MessageGroup
                key={index}
                isUserMessage={true}
                msg={messageData.message}
                sender={messageData.sender}
                time={messageData.timestamp}
                isError={messageData.error}
                isLoading={true}
              />
            ))} */}
          </>
        )}
      </Chat>
      <InputBlock />
    </ChatPageWrapper>
  );
};
