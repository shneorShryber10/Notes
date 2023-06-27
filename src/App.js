import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import React from 'react';


function App() {


  return (
    <div className="body">
      <Header/>
      <div className='main-container'>
        <div className='scroll-view'>
          <Home/>
        </div>
      </div>
    </div>
  );
}

export default App;
