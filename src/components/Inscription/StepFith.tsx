import { useEffect, useState } from "react"
import { interestServices } from "../../services/interestServices"
import { Interest } from "../../types/Profile"
import { Loading } from "../Loading/Loading"
import { RegisterProfile } from "../../types/Profile"
import { InterestButton } from "../InterestButton/InterestButton"

type PropsStepFitfh = {
    setInscriptionForm: React.Dispatch<React.SetStateAction<RegisterProfile>>;
}

export default function StepFifth({ setInscriptionForm }: PropsStepFitfh) {

    const [allInterests, setAllInterests] = useState<Interest[]>([])
    const [selectedInterests, setSelectedInterests] = useState<Interest[]>([])

    //Ajoute ou supprime un intérêt qui a été sélectionné ou désélectionner par le user
    const toggleInterestSelection = (interest: Interest) => {
        if (!selectedInterests.includes(interest)) {
            setSelectedInterests((prev) => [...prev, interest]);
        }
        else {
            setSelectedInterests((prev) => prev.filter((i) => i.id !== interest.id));
        }
        setInscriptionForm((prevForm) => ({ ...prevForm, interests: selectedInterests }))
    }

    //Fonction pour changer le className du button
    const isInterestSelected = (interest: Interest) => {
        return selectedInterests.some((i) => i.id === interest.id)
    }

    //Récupération API des intérêt
    useEffect(() => {
        const loadInterests = async () => {
            try {
                const data = await interestServices.getAllInterest();
                setAllInterests(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des intérêts :", error)
            }
        };
        loadInterests()
    }, [])

    return (
        <>
            {allInterests.length > 0 ?
                <div>
                    {allInterests.map((interest) => (
                        <InterestButton key={interest.id} onClick={() => (toggleInterestSelection(interest))} isInterestSelected={isInterestSelected(interest)}>{interest.name}</InterestButton>
                    ))}
                </div> :
                <Loading style='w-25 h-25 mx-auto' />
            }
            <p className="text-slate-400 mt-2">Tu es libre d’en mettre autant que tu veux n’hésite surtout pas ! Cela va nous aider à trouver des personnes avec qui tu partages des affinités</p>
        </>

    )
}