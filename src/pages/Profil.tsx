import { useEffect, useState } from "react"
import { profileServices } from "../services/profileServices"
import { Profile } from "../types/Profile"
import { Loading } from "../components/Loading/Loading"
import { InterestButton } from "../components/InterestButton/InterestButton"

export default function Profil() {

    const [profile, setProfile] = useState<Profile>()

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await profileServices.getProfile(0);
                setProfile(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du profile:", error)
            }
        };
        loadProfile();
    }, [])


    return (
        <>
            {profile ?
                <>
                    <img src={profile?.pictures} alt="photo de profil" className="w-[200px] h-[200px] object-contain rounded-full mx-auto" />
                    <span>{profile.pseudo}, {profile.age}</span>
                    <span>{profile.city}</span>
                    <p>Je recherche</p>
                    <p>{profile.looking_for}</p>
                    <p>A propos</p>
                    <p>{profile.description?.length > 0 ? profile.description : ''}</p>
                    <p>Centre d'intérêts</p>
                    <div className="px-5">
                        {profile.interest?.map((interest) => (
                            interest.selected === true ?
                                <InterestButton key={interest.id}>{interest.name}</InterestButton>
                                :
                                ""
                        ))
                        }
                    </div>
                </>
                :
                <Loading style='w-25 h-25 mx-auto' />
            }

        </>
    )
}