import { Message, MessageSend } from "../types/Conversation";

export const messageServices = {
    createMessage: async (message: MessageSend) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}message/`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(message)
        });
        const data: Message = await response.json();
        return data
    },
    updateMessage: async (updateMessage: { content: string }, id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}message/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(updateMessage)
        });
        const data: { success: boolean } = await response.json();
        return data
    },
    deleteMessage: async (id: string) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}message/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        const data: { success: boolean } = await response.json();
        return data
    }
}