import moment from "moment";
import { Profile, ProfileCard, UpdateProfile } from '../types/Profile.ts'

export const profileServices = {
    getProfile: async (id?: number) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}profile/${id}`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Erreur de récupération des utilisateurs');
        const data: Profile = await response.json();
        data.age = moment().diff(moment(data.age), 'years').toString();

        return data
    },

    getAllProfile: async (filterProfile: ProfileCard): Promise<Profile[]> => {
        let ageParam = "all";
        if (Array.isArray(filterProfile.age)) {
            const startYear = moment().subtract(filterProfile.age[0], 'year').year().toString();
            const endYear = moment().subtract(filterProfile.age[1], 'year').year().toString();
            ageParam = `${startYear},${endYear}`;
        }
        const url = `${import.meta.env.VITE_api_url}profiles?pseudo=${filterProfile.pseudo}&city=${filterProfile.city}&gender=${filterProfile.gender}&age=${ageParam}`;
        const response = await fetch(url, {
            credentials: "include"
        });
        if (!response.ok) throw new Error('Erreur de récupération des utilisateurs');
        return response.json();
    },

    updateProfile: async (updateProfile: UpdateProfile) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}profile`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(updateProfile)
        })
        const data: { bool: boolean } = await response.json();
        return data
    },

    deleteProfile: async () => {
        const response = await fetch(`${import.meta.env.VITE_api_url}profile`, {
            method: "DELETE",
            credentials: "include",
        })
        const data: { bool: boolean } = await response.json();
        return data
    }
}
