export const messagesReducer = (state, action) => {
    switch (action.type) {
        case "ADD_MESSAGE":
            return { sendMessages: [...state.sendMessages, action.payload] };
        default:
            return             { sendMessages: []}
    }
};