import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { type IMessageStore } from "../reducers/MessagesReducer";
import messagesReducer from "../reducers/MessagesReducer";

export type RootStore = { message: IMessageStore };

const reducer = combineReducers({ message: messagesReducer });
const store = configureStore({ reducer });

export default store;
