type Reservation = {
    success: boolean
}

export const reservationServices = {
    createReservation: async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}reservation/${id}`, {
            method: "POST",
            credentials: 'include'
        });
        const data: Reservation = await response.json();
        return data;
    },
    deleteReservation: async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}reservation/${id}`, {
            method: "DELETE",
            credentials: 'include'
        });
        const data: Reservation = await response.json();
        return data;
    }
}