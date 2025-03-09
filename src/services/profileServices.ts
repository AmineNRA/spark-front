type interest = {
    id: number
    name: string
}

type updatedProfile = {
    pseudo?: string
    age?: string
    city?: string
    description?: string
    interests?: []
    pictures?: []
}

type Profile = {
    id: number
    pseudo: string
    profile_image: string
    looking_for?: string
    city?: string
    description?: string
    age: string
    interests?: interest[]
    like?: string
}

type filterProfile = {
    pseudo: string
    city: string
    gender: string
    age: string | string[]
}

import moment from "moment";

export const profileServices = {
    getProfile: async (id?: number): Promise<Profile> => {
        const response = await fetch(`${import.meta.env.VITE_api_url}profile/${id}`);
        if (!response.ok) throw new Error('Erreur de récupération des utilisateurs');
        const data: Profile = await response.json();
        data.age = moment().diff(moment(data.age), 'years').toString();

        return data
    },

    getAllProfile: async (filterProfile: filterProfile): Promise<Profile> => {
        let ageParam = "all";
        if (Array.isArray(filterProfile.age)) {
            const startYear = moment().subtract(filterProfile.age[0], 'year').year().toString();
            const endYear = moment().subtract(filterProfile.age[1], 'year').year().toString();
            ageParam = `${startYear},${endYear}`;
        }
        const url = `${import.meta.env.VITE_api_url}profiles?pseudo=${filterProfile.pseudo}&city=${filterProfile.city}&gender=${filterProfile.gender}&age=${ageParam}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur de récupération des utilisateurs');
        return response.json();
    },

    updatedProfile: async (newProfile: updatedProfile) => {
        console.log(JSON.stringify(newProfile))
        const response = await fetch(`${import.meta.env.VITE_api_url}profile`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProfile)
        })
        const data: { bool: boolean } = await response.json();
        return data
    },

    deleteProfile: async () => {
        const response = await fetch(`${import.meta.env.VITE_api_url}profile`, {
            method: "DELETE"
        })
        const data: { bool: boolean } = await response.json();
        return data
    }
}
