import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from '../Contexts/AuthContexts'; 
import { navLinks, authLinks } from '../../Data/Data';
import { LuLogOut } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import { Avatar, Badge, Space, message } from 'antd';
import './Nav.css'; // Importa tus estilos personalizados aquí
import { IconButton, Navbar, MobileNav,Typography,  Button, Menu, MenuHandler,MenuList, MenuItem, Card} from '@material-tailwind/react';
import avatar from '@material-tailwind/react';
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";



const profileMenuItems = [
  {
    label: "Mi Perfil",
    icon: UserCircleIcon,
    path: "Perfil"
  },
  {
    label: "Editar Perfil",
    icon: Cog6ToothIcon,
    path: "EditarP"
  },
  {
    label: "Ayuda",
    icon: LifebuoyIcon,
    path: "Ayuda"
  },
 
];


export default function Nav() {
  const [isNavLinksShowing, setIsNavLinksShowing] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [avatarColor, setAvatarColor] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
  };

  useEffect(() => {
    const token = getCookie('jwt');

    if (token) {
      try {
        fetch('http://localhost:3000/verifyToken', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token }),
          credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
          if (result.mensaje === "Token válido") {
            const decodedToken = jwtDecode(token);
            setIsAuthenticated(decodedToken.IsAuthenticated);
            setUserName(decodedToken.nombre);

            // Retrieve avatar color from localStorage if available, otherwise generate a new color
            const storedColor = localStorage.getItem('avatarColor');
            const color = storedColor ? storedColor : getRandomColor();
            setAvatarColor(color);
            // Store the color in localStorage
            localStorage.setItem('avatarColor', color);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch(error => {
          console.error('Error al verificar el token:', error);
          setIsAuthenticated(false);
        });
      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        setIsAuthenticated(false);
      }
    }
  }, [setIsAuthenticated]);
  
  
  const handleLogout = () => {
    message.loading('Cerrando Sesión', 2.5) // Establece la duración del mensaje de carga en 1.5 segundos
      .then(() => {
        setIsAuthenticated(false);
        // Elimina la cookie del token JWT
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/Login');
      });
      
  };

  // Función para obtener un color aleatorio
  const getRandomColor = () => {
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
  };

  return (
    <nav className='navShadow'>
      <div className='container nav-container'>
        <Link to={'/'} className='logo'>
          <img src={Logo} alt='Logo'/>
        </Link>
        <ul className={`nav-links ${isNavLinksShowing ? 'navLinksShow' : 'navLinksHide'}`}>
          {navLinks.map((item, index) => (
            <li key={index}>
              <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                <item.icon className='icon-navs'/>
                <span className='name-navs'>{item.name}</span>
              </NavLink>
            </li>
          ))}
          {isAuthenticated ? (
            <>
<li>
<div className="MenuDes">
<Menu  className="" open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto menuUser"
        >
          <Avatar
  variant="circular"
  size="sm"
  alt={userName}
  className="border border-white-900 p-0.5"
  style={{
    backgroundColor: avatarColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <span style={{ fontSize: '20px', color: 'white',marginLeft: '-10px' }}>
    {userName && userName.charAt(0).toUpperCase()}
  </span>
</Avatar>

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 menuUser">
    {profileMenuItems.map(({ label, icon, path }, key) => {
      const isLastItem = key === profileMenuItems.length - 1;
      return (
        <NavLink to={path} key={label} onClick={closeMenu}>
          <MenuItem
            className={`flex items-center gap-2 rounded menu-item hover:bg-gray-500/10 focus:bg-gray-500/10 active:bg-gray-500/10`}
          >
            {React.createElement(icon, {
              className: `h-4 w-4 colorM`,
              strokeWidth: 2,
              
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal colorM"
            >
              {label}
            </Typography>
          </MenuItem>
        </NavLink>
      );
    })}
    {isAuthenticated && (
      <MenuItem
        onClick={() => {
          closeMenu();
          handleLogout();
        }}
        className="flex items-center gap-2 rounded  hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 menu-item2 "
      >
        <PowerIcon className="h-4 w-4" strokeWidth={2} color='red'/>
        <Typography as="span" variant="small" className="font-normal" color='red'>
          Cerrar Sesión
        </Typography>
      </MenuItem>
    )}
  </MenuList>
    </Menu>
    </div>
</li>
            </>
          ) : (
            authLinks.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                  <item.icon className='icon-navs'/>
                  <span className='name-navs'>{item.name}</span>
                </NavLink>
              </li>
            ))
          )}
        </ul>
        <button className='menu-button' onClick={() => setIsNavLinksShowing(!isNavLinksShowing)}>
          {!isNavLinksShowing ? <FiMenu /> : <IoCloseSharp />}
        </button>
      </div>
    </nav>
  );
}






{/*
              <li>
                <NavLink to="/Perfil" className={({ isActive }) => isActive ? 'active' : ''}>
                <Badge dot>
                  <Avatar 
                   // Clase CSS para centrar el Avatar
                    style={{ 
                      backgroundColor: avatarColor, 
                      verticalAlign: 'middle', 
                      fontSize: '4px', // Ajustar el tamaño de la letra
                      lineHeight: '2px', // Ajustar la altura de línea para centrar verticalmente la letra
                      display: 'flex', // Establecer el contenedor como flex
                      alignItems: 'center', // Centrar verticalmente los elementos dentro del contenedor
                      justifyContent: 'center',  // Establecer la altura del Avatar
                      borderRadius: '50%',
                     // Hacer que el Avatar sea un círculo
                    }}
                    size={25} // Reducir el tamaño del Avatar
                  >
                   <div  className='nombreAvatar' style={{ 

                      backgroundColor: avatarColor, 
                      verticalAlign: 'middle',
                      fontSize: '16px', // Ajustar el tamaño de la letra
                      lineHeight: '2px', // Ajustar la altura de línea para centrar verticalmente la letra
                      display: 'flex', // Establecer el contenedor como flex
                      alignItems: 'center', // Centrar verticalmente los elementos dentro del contenedor
                      justifyContent: 'center',  // Establecer la altura del Avatar
                      borderRadius: '50%',
                      marginLeft: '-21px', // Posicionar el
                     // Hacer que el Avatar sea un círculo
                    }}>{userName && userName[0]}</div>  Muestra la primera letra del nombre 
                    </Avatar>
                    </Badge>
                    <span className='name-navs'>Perfil</span>
                  </NavLink>
                </li>
                <li>
                  Utiliza Tailwind CSS para aplicar estilos al botón y mostrar el mensaje emergente 
                  <NavLink to={'/'} className={({ isActive }) => isActive ? 'active' : ''}>
                  <button 
                    onClick={handleLogout} 
                    className="hover:text-red-800 focus:outline-none relative group {({ isActive }) => isActive ? 'active' : ''}"
                  >
                    <LuLogOut className="text-xl relative icon-navs"/>
                    <span className="name-navs absolute top-full left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Cerrar sesión
                    </span>
                  </button>
                  </NavLink>
                </li>
*/}