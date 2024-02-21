import { useContext } from "react";
import { WebSocketContextType } from "../types/socket.types";
import { WebSocketContext } from "./WebSocketProvider";

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
