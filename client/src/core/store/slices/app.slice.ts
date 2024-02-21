import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { IClientMessage } from "../../../types/chat.types";

interface IAppState {
  messages: IClientMessage[];
  userName: string;
  themeMode: "light" | "dark";
}

const initialState: IAppState = {
  messages: [],
  userName: "",
  themeMode: "light",
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveMessage: (state, action: PayloadAction<IClientMessage>) => {
      const index = state.messages.findIndex(
        (msg) => msg.timestamp === action.payload.timestamp
      );
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
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
} = AppSlice.actions;

export const selectMessages = (state: RootState) => state.app.messages;
export const selectTheme = (state: RootState) => state.app.themeMode;
export const selectUser = (state: RootState) => state.app.userName;

export default AppSlice.reducer;
