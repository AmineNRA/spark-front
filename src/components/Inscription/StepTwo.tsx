import { useState } from "react";
import { inputClassName } from "../../utils/className";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Form } from "../../types/Form";

type StepTwoProps = {
    handleInputChange: Form["handleInputChange"];
    errorMessages: { [key: string]: string };
    pseudo: string;
    age: string;
    gender: "Homme" | "Femme" | "Non genré"
};


export default function StepTwo({ handleInputChange, errorMessages, pseudo, age, gender }: StepTwoProps) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="flex flex-col max-w-[300px] my-4">
                <label htmlFor="pseudo" className="font-bold">
                    Pseudo:
                    <input type="text" name="pseudo" onChange={handleInputChange} className={`${inputClassName} my-2 ${errorMessages.pseudo && "border-red-400"}`} value={pseudo} />
                </label>
                {errorMessages.pseudo && <p className="text-red-500 mt-1">{errorMessages.pseudo}</p>}
                <p className="text-slate-400">Les autres profils te verront sous ce pseudonyme sur l’application</p>

            </div>

            <div className="flex flex-col max-w-[300px]">
                <label htmlFor="age" className="font-bold">
                    Date de naissance :
                    <input type="date" name="age" onChange={handleInputChange} className={`${inputClassName} my-2 ${errorMessages.age && "border-red-400"}`} value={age} />
                </label>
                {errorMessages.age && <p className="text-red-500 mt-1">{errorMessages.age}</p>}
                <p className="text-slate-400">Seulement ton age sera affiché sur ton profil</p>
            </div>

            <div className="relative flex flex-col max-w-[300px] mt-4">
                <label htmlFor="gender" className="font-bold">
                    Ton genre:
                    <select name="gender" id="gender" onChange={handleInputChange} onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} className={`${inputClassName} my-2 ${errorMessages.gender && "border-red-400"}`}>
                        {gender.length > 0 ?
                            <option value={gender}>{gender}</option>
                            :

                            <option value="Non genré">Non genré</option>}
                        <option value="Femme">Femme</option>
                        <option value="Homme">Homme</option>

                    </select>
                </label>
                {isOpen ?
                    <ChevronUp className="absolute right-3 bottom-2 -translate-y-1/2  text-gray-500" /> : <ChevronDown className="absolute right-3 bottom-2 -translate-y-1/2 text-gray-500" />
                }

            </div>
            {errorMessages.gender && <p className="text-red-500 mt-1">{errorMessages.gender}</p>}
        </>
    )
}