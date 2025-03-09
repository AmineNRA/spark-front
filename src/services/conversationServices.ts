import { Conversation, Message } from "../types/Conversation";

export const conversationServices = {

    getAllConversation: async () => {
        const response = await fetch(`${import.meta.env.VITE_api_url}conversations/`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error('Impossible de récupérer les conversations');
        const data: Conversation[] = await response.json();
        return data
    },

    getConversation: async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}conversation?profile_id=${id}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error('Impossible de récupérer la conversation');
        const data: { id: string, Messages: Message[] } = await response.json();
        return data
    },

    deleteConversation: async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}conversation?profile_id=${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        const data: { success: boolean } = await response.json();
        return data
    }
}