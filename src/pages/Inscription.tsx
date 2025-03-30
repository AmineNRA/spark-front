import { useState } from "react";
import { motion } from "motion/react";
import StepOne from "../components/Inscription/StepOne";
import StepTwo from "../components/Inscription/StepTwo";
import StepThree from "../components/Inscription/StepThree";
import StepFourth from "../components/Inscription/StepFourth";
import StepFifth from "../components/Inscription/StepFith";
import Navigation from "../components/Inscription/Navigation/Navigation";
import { Form } from "../types/Form";
import { RegisterProfile } from "../types/Profile";
import { useNavigate } from "react-router-dom";
import { authServices } from "../services/authServices";

export default function Inscription() {

    const [inscriptionForm, setInscriptionForm] = useState<RegisterProfile>({
        pseudo: '',
        mail: '',
        password: '',
        pictures: [],
        age: '',
        gender: 'Non genré',
        looking_for: 'Amitié',
        city: '',
        interests: [],
    })
    const navigate = useNavigate();



    console.log(inscriptionForm, 'objet a envoyer au back')


    const [step, setStep] = useState(1);
    const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});

    console.log(Object.keys(errorMessages).length)
    // Regex pour vérification des inputs
    const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const regexPseudo = /^.{4,12}$/;


    //Fonctions pour la navigation
    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    const handleNextStep = () => {
        const errors = handleError(step);
        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }
        else {
            setErrorMessages({})
            nextStep();
        }

    }

    //Fonction pour vérifier si l'age du user est ok
    const isValidDate = (date: string) => {
        const currentDate = new Date();
        const minDate = new Date();
        const maxDate = new Date();

        minDate.setFullYear(currentDate.getFullYear() - 50);
        maxDate.setFullYear(currentDate.getFullYear() - 18);

        const inputDate = new Date(date);

        return inputDate >= minDate && inputDate <= maxDate;
    }


    //Fonction pour afficher les erreurs des inputs
    const handleError = (step: number) => {
        const errors: { [key: string]: string } = {}
        if (step === 1) {
            if (!regexMail.test(inscriptionForm.mail))
                errors.mail = "L'email n'est pas valide"
            if (!regexPassword.test(inscriptionForm.password))
                errors.password = "Le mot de passe doit contenir entre 6 et 20 caractères avec au moins 1 lettre en majuscule, 1 lettre en minuscule, 1 caractère spéciale et 1 chiffre";
        }
        if (step === 2) {
            if (!regexPseudo.test(inscriptionForm.pseudo)) {
                errors.pseudo = "Le pseudo doit avoir entre 4 et 12 caractères";
            }
            if (!inscriptionForm.age || !isValidDate(inscriptionForm.age)) {
                errors.age = "L'age doit être compris entre 18 et 50 ans";
            }
        }
        if (step === 3) {
            if (inscriptionForm.city.length === 0) {
                errors.city = "La ville est requise"
            }
        }
        return errors;
    }

    //Fonctions pour récupérer les valeurs des inputs
    const handleInputChange: Form["handleInputChange"] = (e) => {
        const { name, value } = e.target;
        setInscriptionForm({ ...inscriptionForm, [name]: value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.keys(errorMessages).length === 0) {
            const register = await authServices.register(inscriptionForm);
            if (register.success === true) {
                const login = { mail: inscriptionForm.mail, password: inscriptionForm.password }
                const isLogged = await authServices.login(login)
                if (isLogged.success === true) {
                    navigate('/login')
                }

            }
        }
        navigate('/profil')
    }
    return (
        <>
            <header className="px-4">
                <img src="src/assets/images/sparkl.webp" alt="image de l'icone" className="mx-auto max-w-[150px] pt-6" />
                <h1 className="text-4xl text-royalblue text-shadow font-bold text-center pt-10 mb-12">
                    {step === 1 && 'Créer un compte'}
                    {step === 2 && "Parles nous un peu de toi ?"}
                    {step === 3 && "On a encore besoin de quelques informations"}
                    {step === 4 && "Une petite photo ?"}
                    {step === 5 && "Quelles sont tes passions ?"}
                </h1>
            </header>
            <main>
                <motion.div
                    key={step}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <form action="POST" onSubmit={handleSubmit} className="flex flex-col px-4">
                        {step === 1 && <StepOne handleInputChange={handleInputChange} errorMessages={errorMessages} email={inscriptionForm.mail} />}
                        {step === 2 && <StepTwo handleInputChange={handleInputChange} errorMessages={errorMessages} pseudo={inscriptionForm.pseudo} age={inscriptionForm.age} gender={inscriptionForm.gender} />}
                        {step === 3 && <StepThree handleInputChange={handleInputChange} errorMessages={errorMessages} city={inscriptionForm.city} />}
                        {step === 4 && <StepFourth setInscriptionForm={setInscriptionForm} />}
                        {step === 5 && <StepFifth setInscriptionForm={setInscriptionForm} />}
                        <Navigation prevStep={prevStep} nextStep={handleNextStep} step={step} />
                    </form>
                </motion.div>

            </main>
        </>

    )
}