import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../models";

export interface IMessageStore {
  sendMessages: IMessage[];
}

const initialState: IMessageStore = {
  sendMessages: JSON.parse(localStorage.getItem("threads") ?? '[]')
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.sendMessages =  [...state.sendMessages, action.payload];
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.sendMessages = state.sendMessages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});

export const { addMessage, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
