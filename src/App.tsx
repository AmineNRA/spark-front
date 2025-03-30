import './styles/App.css'
import { Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MobilePage from './components/mobilePage';
import DesktopPage from './components/DesktopPage';
import Connexion from './pages/Connexion'
import Profil from './pages/Profil';
import Inscription from './pages/Inscription';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={isMobile ? <MobilePage /> : <DesktopPage />} />
        <Route path='/connexion' element={<Connexion />} />
        <Route path='/inscription' element={<Inscription />} />
        <Route path='/profil' element={<Profil />} />
      </Routes>
    </>
  )
}

export default App
