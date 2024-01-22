import React from 'react'
import './LstestArticle.css'

import TitleTypeOne from '../../Ui/TitleTypeOne/TitleTypeOne'

import { lettestArticleData } from '../../Data/Data'

import { Link } from 'react-router-dom'
  // import react Icon.......................
  import {  ImFacebook, ImBehance } from 'react-icons/im';
  import {  FiInstagram } from 'react-icons/fi';
  import {  RiTwitterXLine } from 'react-icons/ri';
  import {  GrLinkedinOption } from 'react-icons/gr';

export default function LstestArticle() {
  return (
    <section className='latestArticle'>
        <div className="continer latet-container">
            <TitleTypeOne Title={'Latest Articles'} TitleTop={'Read our articles'}/>
            <div className="latest-article-content">
                {
                lettestArticleData.map(({titLink, title, date, instLink,
                fbLink, twitaLink, inspiration, image}, index) =>{
                    return(
                        <article className='latest-article' key={index}>
                            <div className="article-image">
                                <img src={image} alt="" />
                            </div>
                            <div className="article-info">
                                <h5>{date}</h5>
                                    <Link to={titLink}>
                                        <h3>{title}</h3>
                                    </Link>
                            </div>
                            <div className="latest-article-social">
                                <a href={fbLink}><ImFacebook/></a>
                                <a href={instLink}><FiInstagram/></a>
                                <a href={twitaLink}><RiTwitterXLine/></a>
                            </div>
                        </article>

                    )
                }
                )}
            </div>
            <Link to={'*'} className='btn btn-border'>
                read all articles
            <span><GrLinkedinOption/></span></Link>
        </div>
       
    </section>
  )
}
