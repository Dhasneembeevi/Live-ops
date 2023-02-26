import React from 'react';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Offers from './Components/Offers';
import Home from './Components/Home';
import OfferView from './Components/OfferView';
function App() {
  return (

    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/offerView' element={<OfferView/>}/>
        <Route path='*' element={<h3>404 error page not found</h3>}/>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
