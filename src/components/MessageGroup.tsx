import { Typography } from "@mui/material";
import { IMessageProps, Message } from ".";
import styled from "@emotion/styled";

interface IMessageGroupProps extends IMessageProps {
  isFirstMessage?: boolean;
}

const DateDivider = styled.div`
  width: 100%;
  text-align: center;
`;

const MessageGroup: React.FC<IMessageGroupProps> = (props) => {
  const { isFirstMessage, ...messageProps } = props;

  return (
    <>
      {isFirstMessage && (
        <DateDivider>
          <Typography variant="caption" color="text.secondary">
            {new Date(props.time).toLocaleDateString()}
          </Typography>
        </DateDivider>
      )}
      <Message {...messageProps} />
    </>
  );
};

export { MessageGroup };
