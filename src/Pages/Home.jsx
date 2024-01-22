import React from 'react'
// Components Imports.................................
import Header from '../Components/Header/Header'
import Brands from '../Components/Brands/Brands'
import FeaturesBooks from  '../Components/FeaturesBooks/FeaturesBooks'
import BestSellingBook from '../Components/BestSellingBook/BestSellingBook'
import PopularBooks from '../Components/PopularBooks/PopularBooks'
import Quote from '../Components/Quote/Quote'
import LstestArticle from '../Components/LstestArticle/LstestArticle'


export default function Home() {
  return (
    <>
    <Header/>
    <Brands/>
    <FeaturesBooks/>
    <BestSellingBook/>
    <PopularBooks/>
    <Quote/>
    <LstestArticle/>
    </>
    
  )
}
