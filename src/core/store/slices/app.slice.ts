import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { IMessage } from "../../types/chat.types";

interface IAppState {
  messages: IMessage[];
  messageQueue: IMessage[];
  userName: string;
  themeMode: "light" | "dark";
}

const initialState: IAppState = {
  messages: [
    {
      sender: "bob",
      message: "Привет, что нового?",
      timestamp: "2024-02-15T10:33:00",
      error: false,
    },
    {
      sender: "bob",
      message: "Собираемся с друзьями вечером.",
      timestamp: "2024-02-15T10:45:00",
      error: false,
    },
    {
      sender: "oleg",
      message: "Привет, я здесь!",
      timestamp: "2024-02-16T10:32:00",
      error: false,
    },
    {
      sender: "alice",
      message: "Да, сегодня занят, но в выходные свободна.",
      timestamp: "2024-02-16T10:40:00",
      error: true,
    },
  ],
  messageQueue: [],
  userName: "",
  themeMode: "light",
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    addMessageToQueue: (state, action: PayloadAction<IMessage>) => {
      state.messageQueue.push(action.payload);
    },
    deleteMessageFromQueue: (state, action: PayloadAction<IMessage>) => {
      const index = state.messageQueue.findIndex(
        (msg) => msg.timestamp === action.payload.timestamp
      );
      if (index !== -1) {
        state.messageQueue.splice(index, 1);
      }
    },
    clearChat: (state) => {
      state.messages = [];
      state.messageQueue = [];
    },
    saveUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    saveTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.themeMode = action.payload;
    },
  },
});

export const {
  saveMessage,
  saveUserName,
  saveTheme,
  clearChat,
  addMessageToQueue,
  deleteMessageFromQueue,
} = AppSlice.actions;

export const selectMessages = (state: RootState) => state.app.messages;
export const selectMessageQueue = (state: RootState) => state.app.messageQueue;
export const selectTheme = (state: RootState) => state.app.themeMode;
export const selectUser = (state: RootState) => state.app.userName;

export default AppSlice.reducer;
