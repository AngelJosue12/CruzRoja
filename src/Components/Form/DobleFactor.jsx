import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { message, Spin, Alert, Flex  } from 'antd';
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from '../Contexts/AuthContexts';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import LoginImg from '../../assets/img/p3.png';
import LoginImg2 from '../../assets/img/logo.png';
import './DobleFactor.css';
import { Button, Space, notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';



export default function Doblefactor() {


  const { setIsAuthenticated, correoGuardar } = useAuth();
  console.log(correoGuardar);
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Verifica si la cookie actual comienza con el nombre proporcionado
        if (cookie.startsWith(name + '=')) {
            // Retorna el valor de la cookie
            return cookie.substring(name.length + 1);
        }
    }
    // Si no se encuentra la cookie, retorna null
    return null;
}


const [spinning, setSpinning] = React.useState(false);
const showLoader = () => {
  setSpinning(true);
  setTimeout(() => {
    setSpinning(false);
  }, 5000);
};

  const navigate = useNavigate();
  const [tokenUser, setTokenUser] = useState('');
  const [tokenError, setTokenError] = useState('');
  const captcha = useRef(null);




  const handleSubmit = (event) => {
    event.preventDefault();
  
    const captchaValue = captcha.current.getValue();
  
    if (!captchaValue) {
      message.warning({
        content: 'Por favor, Realiza el captcha para proseguir.',
        duration: 2, // Duración en segundos antes de que el mensaje desaparezca automáticamente
        style: {
          marginTop: '70px', // Ajusta la distancia vertical desde la parte superior
          marginRight: '-990px', // Ajusta la distancia horizontal desde el borde derecho
        },
      });
      return;
    }
  
   const validado = validateToken(tokenUser);
    if (validado == true) {
      
      const requestBody = {
        correo: correoGuardar,
        tokenUsuario: tokenUser
      };
  
      fetch(`http://localhost:3000/verificacionTokenIdentificacion/${encodeURIComponent(correoGuardar)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      })
        .then(response => response.json())
        .then(result => {
          if (result.mensaje === "El token de verificación es válido") {
            const token = getCookie('jwt');

            let nombre; // Declarar la variable fuera de try
            let Authenticated
            if (token) {
              try {
                // Decodifica el token JWT
                const decodedToken = jwtDecode(token);
                nombre = decodedToken.nombre;
                Authenticated =decodedToken.IsAuthenticated 
              } catch (error) {
                console.error('Error al decodificar el token JWT:', error);
                // Maneja el error según sea necesario
              }
            } else {
              console.error('No se encontró la cookie "jwt"');
              // Maneja el caso en que no se encuentra la cookie según sea necesario
            }
            
            showLoader();
            
            setTimeout(() => {
              if (nombre) { // Comprueba si nombre tiene un valor válido
                message.success(`Autenticación exitosa. Bienvenido, ${nombre}`, 2);
              } else {
                message.success('Autenticación exitosa', 2);
              }
              navigate('/');
              setIsAuthenticated(Authenticated);
            }, 2000);
            
          }  else if (result.mensaje === "El token de verificación es inválido") {
            message.error('El token de verificación es inválido');
          }
        })
        .catch(error => {
          console.error('Error al Verificar la Identidad:', error);
          message.error('Error al Verificar la Identidad, intenta de nuevo más tarde.');
        });
    } else if (validado == false){
        message.warning('Favor de rectificar los datos');
    }
    else {
      console.log('Formulario no válido');
      message.warning('Favor de Rectificar sus datos');
    }
  };
  
 
  const validateToken = (tokenUser) => {
    if (tokenUser === '') {
      setTokenError('No puede estar vacío');
    } else if (tokenUser.length >= 6) {
        setTokenError('');
      return true;
    } else {
        setTokenError('El token debe contener 6 caracteres');
      return false;
    }
  };

  const handleChangeCaptcha = () => {
    const captchaValue = captcha.current.getValue();
    if (captchaValue) {
      console.log("éxito");
    }
  };

  const [errorPresent, setErrorPresent] = useState(false);

  useEffect(() => {
    const anyError = Boolean(tokenUser);
    setErrorPresent(anyError);
  }, [tokenUser]);

  const containerClass = `container2 ${errorPresent ? 'error-present' : ''}`;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };






  return (
    <div className={containerClass} id="container">
         <Spin spinning={spinning} fullscreen />
      <div className="form-container sign-in">
   
        <form onSubmit={handleSubmit}>

          <h3 className='title-form'>Verificacion Doble Factor</h3>
         
          <span>Favor de introducir el Token que fue enviado a .En caso de que no le haya llegado revise su span o recargue su bandeja de recibidos</span>
          <div className="mt-1 grid grid-cols-1 gap-x-1gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="tokenUser" className="block text-sm font-medium leading text-gray-900">Token</label>
              <div className="mt-3">
                <input
                  id="tokenUser"
                  name="tokenUser"
                  value={tokenUser}
                  onChange={(e) => setTokenUser(e.target.value)}
                  onBlur={() => validateToken(tokenUser)}
                  required
                  type="text"
                  autoComplete="tokenUser"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${tokenError ? 'input-error' : ''}`} />
              </div>
              <div className="erroresInicio">
              {tokenError && <p className="error-messageInicio absolute  left-30">{tokenError}</p>}
              </div>

            </div>
          </div>


 
          <div className='cont-remen'>
            <ReCAPTCHA
              ref={captcha}
              sitekey="6LfXgm0pAAAAAA6yN5NyGT_RfPXZ_NLXu1eNoaQf"
              onChange={handleChangeCaptcha}
            />
          </div>
         
          <button className='button2' type="submit" >Verificar</button>
     
        
        
          <img src={LoginImg} className='img-login' alt="" />
          <div className="feature-border container"></div>
          <h4 className='title-form2'>Juntos Hacemos la Diferencia</h4>
          <img src={LoginImg2} className='img-login4' alt="" />
        </form>
      </div>
    </div>
  );
}