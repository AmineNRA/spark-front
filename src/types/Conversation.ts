export type Conversation = {
    id: string;
    pseudo: string;
    profile_image: string;
    lastMessage: string;
}

export type Message = {
    id?: string;
    content: string;
    status: string;
    created_at: string;
    updated_at?: string;
    pseudo: string;
    profile_image: string;
}

export type MessageSend = Pick<Message, "content"> & {
    conversation_id: number
}