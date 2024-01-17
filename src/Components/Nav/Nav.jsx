// import Nav.css
import './Nav.css'
//import Router Link
import { Link, NavLink } from 'react-router-dom'

// import logo

import Logo from '../../assets/logo.png'

//import NavData
import{navLinks, navRight} from '../../Data/Data'

//import menu icons
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";


import { useState } from 'react';

export default function Nav() {

  const [isNavLinksShowing, setIsNavLinksShowing]= useState(false);

      if(innerWidth < 1024){
        window.addEventListener('scroll',()=>{
          document.querySelector('.nav-links').classList.add('navLinksHide');
          setIsNavLinksShowing(false);
        })
      };
      window.addEventListener('scroll',()=>{
        document.querySelector('.nav').classList.toggle('navShadow', window.screenY > 0);
      })


  return (
  <nav className='navShadow'>
    <div className='container nav-container '>
        {/*....................Logo............*/}
        <Link to={'/'}  className='logo'>
            <img src={Logo} alt='Logo'/>
        </Link>

        {/*....................NavLinks............*/}
        <ul className={`nav-links ${isNavLinksShowing ? 'navLinksShow' : 'navLinksHide'}`}>
           {
             navLinks.map(({name, path}, index)=>{
               return(
                <li key={index}>
                    <NavLink to={path} className={({isActive})=>
                      isActive ? 'active' : ''
                    }>{name}</NavLink>
                </li>
               )
             })
           } 
            
        </ul>
        {/*....................NavRight............*/}
        <div className="nav-right">
            {
                navRight.managements.map((item, index)=>{
                       return(
                       <Link key={index} 
                       //target='_blank'
                       className='management-icons' to={item.link}>
                        <item.icon/>
                       </Link>
                       )
                })
            }
        </div>
            
              <button className='menu-button' onClick={()=>
                setIsNavLinksShowing(!isNavLinksShowing)
              }>
              {
                !isNavLinksShowing ? <FiMenu /> : <IoCloseSharp />
              }
              </button>
    </div>
    </nav>
  )
}
