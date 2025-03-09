export type Participant = {
    pseudo: string;
    picture: string;
}

export type Event = {
    title: string;
    tag: string;
    description: string;
    date: string;
    time: string;
    street: string;
    city: string;
    postal_code: string;
    full_image: string;
    max_participant: number;
}

export type EventPreview = Event & {
    id: number;
    participants: Participant[];
    creator: string
}

export type EventCard = Pick<Event, "title" | "tag" | "description"> & {
    id: number;
    thumbnail_image: string;
}

export type UpdateEvent = Partial<Event> & { id: number }