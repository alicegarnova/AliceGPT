import {createStore} from "redux"
import {messagesReducer} from "../reducers/MessagesReducer"

const store = createStore(messagesReducer)
export default store
