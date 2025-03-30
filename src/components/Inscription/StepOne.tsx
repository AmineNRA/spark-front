import { useState } from "react";
import { inputClassName, labelClassName } from "../../utils/className";
import { EyeClosed, Eye } from "lucide-react";
import { Form } from "../../types/Form";

type StepOneProps = {
    handleInputChange: Form["handleInputChange"];
    errorMessages: { [key: string]: string };
    email: string
};

export default function StepOne({ handleInputChange, errorMessages, email }: StepOneProps) {

    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0)

    const [bgStrength, setBgStrength] = useState('bg-red-500')

    const checkStrength = (pwd: string) => {
        let score: number = 0;
        if (pwd.length > 6) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        if (score >= 0 && score < 1) {
            setBgStrength('bg-red-500')
        }
        else if (score >= 1 && score < 2) {
            setBgStrength('bg-yellow-500');
        } else if (score > 2 && score <= 4) {
            setBgStrength('bg-green-500');
        }
        setStrength(score);
    }

    return (
        <>

            <div className="relative min-w-[250px] max-w-3/4 mx-auto my-3">

                <input
                    type="text" id="mail"
                    name="mail"
                    autoComplete="email" aria-required="true"
                    required
                    value={email}
                    className={`${inputClassName}  ${errorMessages.mail && "border-red-400"}`} placeholder=" "
                    onChange={handleInputChange} />

                <label htmlFor="mail" className={`${labelClassName} left-3`}>Email</label>


            </div>
            {errorMessages.mail && <p className="text-red-500 text-center mt-1">{errorMessages.mail}</p>}


            <div className="relative min-w-[250px] max-w-3/4 mx-auto my-3">

                <input
                    type={showPassword ? 'text' : 'password'} id="password"
                    aria-required="true"
                    name="password"
                    required className={`${inputClassName} ${errorMessages.password && "border-red-400"}`}
                    placeholder=" "
                    onChange={(e) => { checkStrength(e.target.value); handleInputChange(e) }} />

                <label htmlFor="password" className={labelClassName}>Mot de passe</label>

                <button type="button" className="absolute right-2 top-3.5 bg-white" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye /> : <EyeClosed />}
                </button>


            </div>

            <div className={`text-center min-w-[250px] max-w-3/4 mx-auto font-bold my-4 ${bgStrength} min-h-[25px]`}>{["Très faible", "Faible", "Moyen", "Fort", "Très fort"][strength]}</div>

            {errorMessages.password && <p className="text-red-500 text-center mt-1 text-justify px-8">{errorMessages.password}</p>}


        </>
    )
}