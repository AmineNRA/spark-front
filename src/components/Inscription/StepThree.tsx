import { useEffect, useState } from "react";
import { inputClassName } from "../../utils/className";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Form } from "../../types/Form";

type StepThreeProps = {
    handleInputChange: Form["handleInputChange"];
    errorMessages: { [key: string]: string };
    city: string;
};

export default function StepThree({ handleInputChange, errorMessages, city }: StepThreeProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [suggestedCity, setSuggestedCity] = useState<string[]>([])
    const [query, setQuery] = useState('')

    const getCity = async (query: string) => {
        if (!query.trim()) return;

        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`)
        const data = await response.json();

        const structuredCities: string[] = data.map((city: { name: string; address: { country: string } }) =>
            `${city.name}, ${city.address.country}`
        );

        setSuggestedCity(structuredCities);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query) getCity(query);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelectCity = (city: string) => {
        setQuery(city);
        setSuggestedCity([]);
    };


    return (
        <>
            <div className="flex flex-col max-w-[300px] my-4">
                <label htmlFor="sex_orientation" className="font-bold">
                    Ton orientation sexuelle :
                </label>
                <div className="relative">
                    <select name="sex_orientation" id="sex_orientation" onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} className={`${inputClassName} my-2 font-bold ${errorMessages.gender && "border-red-400"}`}>
                        <option value="Ne se prononce pas">Ne se prononce pas</option>
                        <option value="Hétérosexuel">Hétérosexuel</option>
                        <option value="Homosexuel">Homosexuel</option>
                        <option value="Bisexuel">Bisexuel</option>
                    </select>

                    {isOpen ?
                        <ChevronUp className="absolute right-3 bottom-2 -translate-y-1/2  text-gray-500" /> : <ChevronDown className="absolute right-3 bottom-2 -translate-y-1/2 text-gray-500" />
                    }
                </div>
                {errorMessages.looking_for && <p className="text-red-500 mt-1">{errorMessages.looking_for}</p>}
                <p className="text-slate-400">Ca va nous permettre de te proposer des personnes qui te correspondent réellement</p>

            </div>

            <div className="flex flex-col max-w-[300px]">
                <label htmlFor="looking_for" className="font-bold">
                    Tu cherches quoi :
                </label>
                <div className="relative">
                    <select name="looking_for" id="looking_for" onChange={handleInputChange} onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} className={`${inputClassName} my-2 font-bold ${errorMessages.gender && "border-red-400"}`}>
                        <option value="Je ne sais pas">Je ne sais pas</option>
                        <option value="Amour">Amour</option>
                        <option value="Amitié">Amitié</option>
                    </select>

                    {isOpen ?
                        <ChevronUp className="absolute right-3 bottom-2 -translate-y-1/2  text-gray-500" /> : <ChevronDown className="absolute right-3 bottom-2 -translate-y-1/2 text-gray-500" />
                    }
                </div>
                {errorMessages.looking_for && <p className="text-red-500 mt-1">{errorMessages.looking_for}</p>}
                <p className="text-slate-400">Pas de pression tu pourras toujours le modifier par la suite</p>
            </div>

            <div className="relative flex flex-col max-w-[300px] mt-4">
                <label htmlFor="city" className="font-bold">
                    Ta ville :
                    <input
                        type="text"
                        name="city"
                        value={query ? query : city}
                        onChange={(e) => { setQuery(e.target.value); handleInputChange(e); }}
                        placeholder="Rechercher une ville..."
                        className={`${inputClassName} my-2 ${errorMessages.age && "border-red-400"}`}
                    />
                </label>

                {/* Affichage des suggestions si elles existent */}
                {suggestedCity.length > 0 && (
                    <ul className=" w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md">
                        {suggestedCity.map((city, index) => (
                            <li
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectCity(city)}
                            >
                                {city}
                            </li>
                        ))}
                    </ul>
                )}

            </div>
            {errorMessages.city && <p className="text-red-500 mt-1">{errorMessages.city}</p>}
        </>
    )
}