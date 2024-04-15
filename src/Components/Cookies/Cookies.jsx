import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Cookies.css';
import cookieimg from './cookie.png';

function CookieBanner({ onAccept }) {
  const [hidden, setHidden] = useState(false);

  const handleAcceptClick = () => {
    setHidden(true);
    setTimeout(() => {
      onAccept();
    }, 2000); // Espera 2 segundos antes de ejecutar la acción de aceptar, ajusta según la duración de tu animación de cookies
  };

  return (
    <div className={`cookie-banner-container ${hidden ? 'hide' : ''}`}>
     
      <img src={cookieimg} alt="" className="cookie1" />
      <img src={cookieimg} alt="" className="cookie2" />
      <img src={cookieimg} alt="" className="cookie3" />
      <img src={cookieimg} alt="" className="cookie4" />
      <img src={cookieimg} alt="" className="cookie5" />
      <img src={cookieimg} alt="" className="cookie6" />
      <img src={cookieimg} alt="" className="cookie7" />
      <img src={cookieimg} alt="" className="cookie8" />
      <img src={cookieimg} alt="" className="cookie9" />
      <img src={cookieimg} alt="" className="cookie10" />
      <h3 className="title">Cookies</h3>
      <p className="cookie-info">
      Este sitio web utiliza cookies para garantizar que obtengas la mejor experiencia en nuestro sitio web.
        Para obtener más información sobre cómo utilizamos las cookies, consulta nuestra política de cookies.
      </p>
      <a href="#" className="confirm-button" onClick={handleAcceptClick}>
        Aceptar
      </a>
      <a className="second-button">
      <Link className='second-button' to={'/Cookies'} >
      Consulta nuestra política de Cookies.
      </Link>
      
      </a>
    </div>
  );
}

export default CookieBanner;
