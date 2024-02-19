import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

let client: Client | null = null;

export const connectToWebSocket = () => {
  if (!client) {
    client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 6000,
    });

    client.onConnect = (frame) => {
      console.log("Connected: " + frame);
      toast.error("Соединение установлено.");
    };

    client.onStompError = (frame) => {
      console.log(frame);
      toast.error("Ошибка подключения.");
    };

    client.onWebSocketError = (event) => {
      console.log(event);
      toast.error("Ошибка подключения.");
    };

    client.activate();
  }
};

export const disconnectWebSocket = () => {
  if (client) {
    client.deactivate();
  } else {
    console.error("WebSocket is not connected.");
  }
  client = null;
};

export const sendMessage = (message: string) => {
  if (client && client.connected) {
    client.publish({ destination: "/app/sendMessage", body: message });
  } else {
    toast.error("Не удалось установить соединение.");
  }
};
