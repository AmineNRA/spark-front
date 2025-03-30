import { useState } from "react"
import { authServices } from "../services/authServices";
import { inputClassName, labelClassName } from "../utils/className";
import { useNavigate } from "react-router-dom";

export default function Connexion() {

    const [loginForm, setLoginForm] = useState({ mail: '', password: '' })
    const [isCorrect, setIsCorrect] = useState(true)
    const navigate = useNavigate()

    let isLogin = { success: false }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isLogin = await authServices.login(loginForm);
        if (!isLogin.success) {
            setIsCorrect(false)
        }
        else {
            navigate('/profil')
        }
    }

    return (
        <>
            <img src="src/assets/images/sparkl.webp" alt="image de l'icone" className="mx-auto max-w-[200px] pt-6" />
            <h2 className="text-4xl text-royalblue text-shadow font-bold text-center pt-20 mb-12">Connexion</h2>

            {!isCorrect ?
                <p className="text-red-600 text-center mb-3">Erreur sur l'adresse mail et/ou le mot de passe</p> :
                ''}

            <form action="POST" onSubmit={handleSubmit} className="flex flex-col justify-center items-center">

                <div className="relative mb-8 min-w-[250px] max-w-3/4">

                    <input
                        type="text" id="mail"
                        name="mail" onFocus={() => setIsCorrect(true)}
                        autoComplete="email" aria-required="true"
                        onChange={handleInputChange} required
                        className={`${inputClassName}
                    ${isCorrect ? '' : 'border-red-600'}`} placeholder=" " />

                    <label htmlFor="mail" className={`${labelClassName} left-3`}>Email</label>

                </div>

                <div className="relative mb-3 min-w-[250px] max-w-3/4">

                    <input
                        type="password" id="password"
                        aria-required="true" onFocus={() => setIsCorrect(true)}
                        name="password" onChange={handleInputChange}
                        required className={`${inputClassName} 
                    ${isCorrect ? '' : 'border-red-600'}`}
                        placeholder=" " />

                    <label htmlFor="password" className={labelClassName}>Mot de passe</label>

                </div>
                <a href="/inscription" className="text-sky-600 font-bold">Vous n'êtes pas inscrit ?</a>

                <button type="submit" className="min-w-[250px] bg-royalblue py-2 px-6 mt-4 text-3xl text-white font-semibold rounded-3xl flex items-center justify-center box-shadow focus:ring-4 shadow-lg transform active:scale-80 transition-transform">Connexion</button>

            </form>
        </>
    )
}