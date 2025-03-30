export type Interest = {
    id: number
    name: string
}

export type Image = {
    position: string,
    url: string
}

export type Profile = {
    id: number;
    pseudo: string;
    mail: string;
    password: string;
    pictures?: Image[] | string;
    age: string;
    gender: "Homme" | "Femme" | "Non genré";
    looking_for?: "Homme" | "Femme" | "Amitié";
    city: string;
    description?: string
    like?: string | null
    interests?: Interest[]
}

export type RegisterProfile = Omit<Profile, 'id'>;

export type LoginProfile = Pick<Profile, "mail" | "password">;

export type UpdateProfile = Partial<Omit<Profile, "id">>;

export type ProfileCard = Pick<Profile, "pseudo" | "age" | "gender" | "city" | "pictures">;

export type ProfilePreview = Omit<Profile, "mail" | "password">;