import React from 'react'
import wawe from './wawe.png'
import './Footer.css'

import { Link } from 'react-router-dom'

import { FootersLinksData } from '../../Data/Data'

import CopyRight from '../CopyRight/CopyRight'

export default function Footer() {
  return (
    <>
    <footer>
      
      
      <div className="container footer-container">
        {/*.......................About Params................. */}
          <div>
            <h4>Conocenos</h4>
            <ul className="about-params param-links">
                {
                  FootersLinksData.Nosotros.map(({link, linkname}, index)=>{
                    return(
                        <li key={index}><Link to={link}>{linkname}</Link></li>
                    )
                  })
                }
            </ul>
          </div>
          {/*.......................Discover Params................. */}
          <div>
            <h4>Contenido</h4>
            <ul className="about-params param-links">
                {
                  FootersLinksData.Contenido.map(({link, linkname}, index)=>{
                    return(
                        <li key={index}><Link to={link}>{linkname}</Link></li>
                    )
                  })
                }
            </ul>
          </div>
      
          {/*.......................Help Params................. */}
          <div>
            <h4>Ayuda</h4>
            <ul className="Help-params param-links">
                {
                  FootersLinksData.Help.map(({link, linkname}, index)=>{
                    return(
                        <li key={index}><Link to={link}>{linkname}</Link></li>
                    )
                  })
                }
            </ul>
          </div>
      </div>
      <CopyRight/>
    </footer>
      <div class="svg-container">
      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150 wawefooter"><path d="M 0,400 L 0,150 C 121.89285714285714,127.46428571428572 243.78571428571428,104.92857142857143 362,114 C 480.2142857142857,123.07142857142857 594.7499999999999,163.75000000000003 721,170 C 847.2500000000001,176.24999999999997 985.2142857142858,148.07142857142858 1107,139 C 1228.7857142857142,129.92857142857142 1334.392857142857,139.96428571428572 1440,150 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="#ad2e2e" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
      </div>
      </>
  )
}
