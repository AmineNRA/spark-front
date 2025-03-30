import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { useNavigate } from "react-router-dom";
import caroussel from "../utils/caroussel.ts"
import "swiper/swiper-bundle.css";

export default function MobilePage() {

    const navigate = useNavigate()


    return (
        <>
            <h1 className="absolute z-2 inline text-sky-500 text-5xl font-bold text-shadow mt-8 ml-4">Spark</h1>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="w-full h-screen"
            >
                <SwiperSlide style={{ backgroundImage: `url(${caroussel[0].url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'static' }}>
                    <div className="w-full h-screen bg-overlay">
                        <div className="absolute bottom-60 px-2">
                            <h2 className="font-bold text-2xl text-white text-shadow mb-2">{caroussel[0].title}</h2>
                            <p className="text-lg text-white text-shadow">{caroussel[0].text}</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundImage: `url(${caroussel[1].url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'static' }}>
                    <div className="w-full h-screen bg-overlay">
                        <div className="absolute bottom-60 px-2">
                            <h2 className="font-bold text-2xl text-white text-shadow mb-2">{caroussel[1].title}</h2>
                            <p className="text-lg text-white text-shadow">{caroussel[1].text}</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundImage: `url(${caroussel[2].url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'static' }}>
                    <div className="w-full h-screen bg-overlay">
                        <div className="absolute bottom-60 px-2">
                            <h2 className="font-bold text-2xl text-white text-shadow mb-2">{caroussel[2].title}</h2>
                            <p className="text-lg text-white text-shadow">{caroussel[2].text}</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundImage: `url(${caroussel[3].url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'static' }}>
                    <div className="w-full h-screen bg-overlay">
                        <div className="absolute bottom-60 px-2">
                            <h2 className="font-bold text-2xl text-white text-shadow mb-2">{caroussel[3].title}</h2>
                            <p className="text-lg text-white text-shadow">{caroussel[3].text}</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <button className="absolute z-2 bottom-20 left-25 bg-sky-600 py-2 px-6 text-3xl text-white font-semibold rounded-3xl flex items-center justify-center box-shadow focus:ring-4 shadow-lg transform active:scale-80 transition-transform" onClick={() => navigate('connexion')}><span>Se connecter</span></button>
        </>

    )
} 