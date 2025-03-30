import { Interest } from "../types/Profile";

export const interestServices = {
    getAllInterest: async () => {
        const response = await fetch(`${import.meta.env.VITE_api_url}interests/`);
        if (!response.ok) throw new Error('Impossible de récupérer les conversations');
        const data: Interest[] = await response.json();
        return data
    }
}