import { useState } from "react";
import { Form } from "../../types/Form";
import { RegisterProfile } from "../../types/Profile";
import { Image } from "../../types/Profile";

type PropsStepFourth = {
    setInscriptionForm: React.Dispatch<React.SetStateAction<RegisterProfile>>;
}

export default function StepFourth({ setInscriptionForm }: PropsStepFourth) {

    const [images, setImages] = useState<Image[]>([])

    const handleImageChange: Form["handleInputChange"] = (e) => {
        const objectImage = {
            url: '',
            position: ''
        }
        switch (e.target.name.slice(5 - 6)) {
            case '1':
                objectImage.position = "1"
                break;
            case '2':
                objectImage.position = "2"
                break;
            case '3':
                objectImage.position = "3"
                break;
            case '4':
                objectImage.position = "4"
                break;
        }
        const data = new FileReader();
        data.addEventListener("load", () => {
            if (typeof data.result === "string") {
                objectImage.url = data.result
                setImages([...images, objectImage]);
                setInscriptionForm((prevForm) => ({ ...prevForm, pictures: images }))
            }
        });
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            data.readAsDataURL(target.files[0]);
        }
    }

    const test = (position: string) => {
        const image = images.find((image) => image.position === position);
        return image?.url;
    }

    return (
        <>
            <div className="grid grid-cols-[auto_1fr] h-[350px] w-[350px] gap-1 mx-auto">

                <label htmlFor="image-1" className="border-r border-white row-span-3 col-span-1 max-h-[300px] max-w-[250px] flex items-center justify-center" >
                    {images.find((element) => element.position === '1') ?
                        <img src={test('1')} alt="" className="w-full h-full object-cover" />
                        :
                        <img src="/images/add_image.webp" alt="ajouter une image" aria-label="Selectionner une photo de profil" className="w-full h-full object-cover" />
                    }

                    <input type="file" name="image-1" id="image-1" className="hidden" onChange={(e) => handleImageChange(e)} />
                </label>

                <div className="grid grid-rows-3 gap-1 max-h-[300px] max-w-[100px]">

                    <label htmlFor="image-2" className="flex items-center justify-center" >
                        {images.find((element) => element.position === '2') ?
                            <img src={test('2')} alt="" className="w-full h-full object-cover" />
                            :
                            <img src="/images/add_image.webp" alt="ajouter une image" aria-label="Selectionner une photo de profil" className="w-full h-full object-cover" />
                        }

                        <input type="file" name="image-2" id="image-2" className="hidden" onChange={(e) => handleImageChange(e)} />
                    </label>

                    <label htmlFor="image-3" className="flex items-center justify-center" >
                        {images.find((element) => element.position === '3') ?
                            <img src={test('3')} alt="" className="w-full h-full object-cover" />
                            :
                            <img src="/images/add_image.webp" alt="ajouter une image" aria-label="Selectionner une photo de profil" className="w-full h-full object-cover" />
                        }

                        <input type="file" name="image-3" id="image-3" className="hidden" onChange={(e) => handleImageChange(e)} />
                    </label>

                    <label htmlFor="image-4" className="flex items-center justify-center"  >
                        {images.find((element) => element.position === '4') ?
                            <img src={test('4')} alt="" className="w-full h-full object-cover" />
                            :
                            <img src="/images/add_image.webp" alt="ajouter une image" aria-label="Selectionner une photo de profil" className="w-full h-full object-cover" />
                        }
                        <input type="file" name="image-4" id="image-4" className="hidden" onChange={(e) => handleImageChange(e)} />
                    </label>

                </div>
            </div>
            <p className="text-slate-400">On te laisse en mettre plusieurs ou aucune ! Mais sans photo les profils sont moins consultés.</p>
        </>
    )
}