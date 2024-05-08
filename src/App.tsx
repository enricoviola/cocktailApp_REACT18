// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeScreen from "./screen/HomeScreen";
import AboutScreen from "./screen/AboutScreen";
import ContactScreen from "./screen/ContactScreen";
// import SingleCocktailScreen from "./screen/SingleCocktailScreen";
import ErrorScreen from "./screen/ErrorScreen";
import IngredientsScreen from './screen/ingredientsScreen';

function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/about' element={<AboutScreen />} />
        <Route path='/contatti' element={<ContactScreen />} />
        <Route path='/ingredienti' element={<IngredientsScreen />} />
        {/*<Route path='/cocktail/:id' element={<SingleCocktailScreen />} />*/}
        <Route path='*' element={<ErrorScreen />} />
      </Routes>
      <Footer />
    </Router>
  </>
  )
}

export default App
