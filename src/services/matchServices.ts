type MatchedProfiles = {
    pseudo: string,
    age: string,

}

type Match = {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    matched_profiles: MatchedProfiles[]
}

export const matchServices = {

    getAllMatch: async () => {
        const response = await fetch(`${import.meta.env.VITE_api_url}matchs`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Erreur de récupération des matchs')
        const data: Match = await response.json();
        return data;
    },

    createMatch: async (profile_id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}match?profile_id=${profile_id}`, {
            method: "POST",
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Erreur du like')
        const data: { success: boolean } = await response.json();
        return data;
    },

    deleteMatch: async (match_id: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}match?match_id=${match_id}`, {
            method: "DELETE",
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Erreur du like')
        const data: { success: boolean } = await response.json();
        return data;
    }
}