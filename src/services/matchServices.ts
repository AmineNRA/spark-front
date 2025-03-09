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