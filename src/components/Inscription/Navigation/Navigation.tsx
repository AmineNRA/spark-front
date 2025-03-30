export default function Navigation({ prevStep, nextStep, step }) {
    return (
        <div className="relative mt-10">
            {step > 1 && <button className="absolute left-4 font-bold text-white bg-red-500 px-3 py-1 rounded-xl" onClick={prevStep}>Retour</button>}
            {step < 5 ? <button className="absolute right-4 font-bold text-white bg-sky-500 px-3 py-1 rounded-xl" onClick={nextStep}>Suivant</button>
                :
                <button type='submit' className="absolute right-4 font-bold text-white bg-sky-500 px-3 py-1 rounded-xl">Fini !</button>}
        </div>
    )
}