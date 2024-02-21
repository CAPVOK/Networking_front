import styled from "@emotion/styled";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/send";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "../core/store";
import { saveMessage, selectUser } from "../core/store/slices/app.slice";
import { IMessageRequest } from "../types/chat.types";
import { useWebSocket } from "../hooks/useWebSocket";

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  gap: 5px;
  align-items: flex-end;
`;

function InputBlock() {
  const [isSendLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const userName = useSelector(selectUser);

  const { webSocketService } = useWebSocket();
  const dispatch = useDispatch();

  const handleSendClick = () => {
    sendMessage();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey && inputValue.trim()) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const currentDateTime = new Date().toISOString();
      const messageData: IMessageRequest = {
        message: inputValue,
        timestamp: currentDateTime,
        sender: userName,
      };

      dispatch(saveMessage({ ...messageData, error: false, isLoading: false }));
      webSocketService.sendMessage(messageData);
      setInputValue("");
    }
  };

  return (
    <Wrapper>
      <TextField
        id="send-input-message"
        multiline
        maxRows={5}
        fullWidth
        size="small"
        value={inputValue}
        disabled={!userName}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <IconButton
        onClick={handleSendClick}
        disabled={!inputValue || isSendLoading || !userName}
        ref={buttonRef}
      >
        <SendIcon
          color={
            !inputValue || isSendLoading || !userName ? "disabled" : "primary"
          }
        />
      </IconButton>
    </Wrapper>
  );
}

export { InputBlock };
