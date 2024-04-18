import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuth } from '../Components/Contexts/AuthContexts'
//import pages.......
import HomeAdmin from '../Admin/Pages/Home/HomeAdmin'
import Home from '../Pages/Home'
import Login from '../Pages/User/Login/Login'
import Registrer from '../Pages/User/Registrer/Registrer'
import NotFound from '../Pages/NotFound/NotFound'
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs'
import Servicios from '../Pages/Servicios/Servicios'
import RecuperarContraseña from '../Components/Form/RecuperarContraseña'
import MapNav from '../Pages/MapaNav'
import Token from '../Components/Form/Token'
import Restablece from '../Components/Form/Restablece'
import Terminos from '../Pages/Terminos y Politicas/Terminos'
import Politicas from '../Pages/Terminos y Politicas/Politicas'
import PoliCokkies from '../Pages/PoliticasCookies/PoliCokkies'
import Perfil from '../Pages/User/Perfil'
import DobleFactor from '../Components/Form/DobleFactor'
//import components.....
 import Nav from '../Components/Nav/Nav'
 import Footer from '../Components/Footer/Footer'
 import './Router.css'
 import { message } from 'antd';
 import { useState, useEffect } from 'react'
 import CookieBanner from '../Components/Cookies/Cookies'
 import Citas from '../Pages/Citas/Citas'
 import ProtectorRutas from './ProtectedRoute'
 import ContratacionAmbulancias  from   '../Pages/ContratacionAmbulancias/ContratacionAmbulancias'
 import Contenido from '../Components/ChatBot/Contenido/Contenido'

export default function Router() {

  
  const { isAuthenticated } = useAuth();
 const autentificado = isAuthenticated;
 
  console.log(isAuthenticated);

  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };


  
  


  return (  
    <BrowserRouter>
        {showCookieBanner && <CookieBanner className="" onAccept={handleAcceptCookies} />}
    <Nav/>
    <div className="mPan"><Breadcrumbs/></div>

    <Routes>
       {/* Rutas públicas */}
       <Route path="/" element={<Home />} />
        <Route path="Servicios" element={<Servicios />} />
        <Route path="Recuperacion" element={<RecuperarContraseña />} />
        <Route path="Token" element={<Token />} />
        <Route path="Restablece" element={<Restablece />} />
        <Route path="Terminos" element={<Terminos />} />
        <Route path="Politicas" element={<Politicas />} />
        <Route path="Cookies" element={<PoliCokkies />} />
        <Route path="DobleFactor" element={<DobleFactor />} />
        <Route path="Citas" element={<Citas />} />
        <Route path="ContratacionAmbulancias" element={<ContratacionAmbulancias />} />
        {/* Ruta para el perfil */}
        
        <Route element={<ProtectorRutas user={autentificado}/>}>
          <Route path="Perfil" element={ <Perfil />}/>
        </Route>

     <Route path='Login' element={ <Login/>}/>
          <Route path="Registro" element={<Registrer/>}/>

        {/* Ruta para cualquier otro caso */}
        <Route path="*" element={<NotFound />} />
  
    </Routes>
    <Contenido/>
    <Footer/>
    </BrowserRouter>

    
  )
}



