export interface IMessageRequest {
  sender: string;
  timestamp: string;
  message: string;
}

export interface IMessage {
  sender: string;
  timestamp: string;
  message: string;
  error: boolean;
}
