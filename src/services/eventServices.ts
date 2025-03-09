import { Event, EventCard, EventPreview, UpdateEvent } from "../types/Event";

export const eventServices = {

    getAllEvent: async (filterEvent: { tag: string, date: string }) => {
        const url = `${import.meta.env.VITE_api_url}events?tag=${filterEvent.tag}&date=${filterEvent.date}`;
        const response = await fetch(url, {
            credentials: "include"
        });
        if (!response.ok) throw new Error('Erreur de récupérations des évènements');
        const data: EventCard[] = await response.json();
        return data;
    },

    getEvent: async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}event/${id}`, {
            credentials: 'include'
        });
        const data: EventPreview = await response.json();
        return data;
    },

    createEvent: async (event: Event) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}event`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(event)
        });
        const data: { id: number } = await response.json();
        return data;
    },

    updateEvent: async (eventUpdated: UpdateEvent) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}event/${eventUpdated.id}`, {
            method: "PATCH",
            credentials: 'include',
            body: JSON.stringify(eventUpdated)
        });
        const data: EventPreview = await response.json();
        return data;
    },

    deleteEvent: async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}event/${id}`, {
            credentials: 'include'
        });
        const data: { success: boolean } = await response.json();
        return data;
    }
}