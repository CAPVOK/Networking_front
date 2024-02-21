import styled from "@emotion/styled";
import { CircularProgress, Palette, Typography } from "@mui/material";

export interface IMessageProps {
  msg: string;
  isUserMessage: boolean;
  sender: string;
  time: string;
  isError: boolean;
  isLoading?: boolean;
}

const MessageWrapper = styled.div<{
  theme?: { palette: Palette };
  isUser?: boolean;
  error?: boolean;
}>`
  padding-inline: 12px;
  padding-block: 8px;
  width: fit-content;
  position: relative;
  max-width: 300px;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: ${(props) => (props.isUser ? "10px" : "")};
  border-bottom-right-radius: ${(props) => (props.isUser ? "" : "10px")};
  background-color: ${(props) =>
    props.error
      ? props.theme.palette?.error.main
      : props.theme.palette?.primary?.main};
`;
const TextBlockWrapper = styled.div``;
const InfoWrapper = styled.div<{ isUser?: boolean }>`
  position: absolute;
  width: max-content;
  bottom: -20px;
  right: ${(props) => (props.isUser ? "0" : "")};
  left: ${(props) => (props.isUser ? "" : "0")};
`;

function Message(props: IMessageProps) {
  const { msg, isUserMessage, sender, time, isError, isLoading } = props;
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <MessageWrapper isUser={isUserMessage} error={isError}>
      <TextBlockWrapper>
        {!isUserMessage && (
          <Typography
            sx={{ margin: 0, padding: 0 }}
            fontSize={14}
            variant="caption"
            color=""
          >
            {sender}
          </Typography>
        )}
        {isError ? (
          <Typography variant="body1" color="common.white">
            Ошибка
          </Typography>
        ) : (
          <Typography variant="body1" color="common.white">
            {msg}
          </Typography>
        )}
      </TextBlockWrapper>
      <InfoWrapper isUser={isUserMessage}>
        {isLoading ? (
          <CircularProgress size={10} />
        ) : (
          <Typography
            sx={{ margin: 0 }}
            variant="caption"
            color="text.secondary"
          >
            {formattedTime}
          </Typography>
        )}
      </InfoWrapper>
    </MessageWrapper>
  );
}

export { Message };
