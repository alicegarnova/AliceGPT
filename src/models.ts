export interface IMessage {
    content: string;    
    role: string;
    id: string
}

export type AddMessageAction = {
    type: string;
    payload: IMessage;
}

export type DeleteMessageAction = {
    type: string;
    payload: IMessage;
}

export type MessageAction = AddMessageAction | DeleteMessageAction
