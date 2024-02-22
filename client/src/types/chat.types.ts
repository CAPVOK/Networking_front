export interfaсe IMessageRequest {
  sender: string;
  timestamp: string;
  message: string;
}

export interfaсe IMessage extends IMessageRequest {
  error: boolean;
}

export interfaсe IсlientMessage extends IMessage {
  isLoading: boolean;
}
