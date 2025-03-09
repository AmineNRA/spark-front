import { RegisterProfile, LoginProfile } from "../types/Profile.js";

export const authServices = {
    register: async (newProfile: RegisterProfile) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProfile)
        });
        const data: { message: string } = await response.json();
        return data;
    },
    login: async (loginInfo: LoginProfile) => {
        const response = await fetch(`${import.meta.env.VITE_api_url}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginInfo)
        })
        if (!response.ok) throw new Error('Erreur de récupération des utilisateurs');
        const data: { success: boolean } = await response.json()
        return data

    },
    logout: async () => {
        const response = await fetch(`${import.meta.env.VITE_api_url}auth/logout`, {
            credentials: 'include'
        });
        const data: { success: boolean } = await response.json();
        return data;
    }
}