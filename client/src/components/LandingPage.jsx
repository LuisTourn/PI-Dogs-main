import React from 'react';
import image from '../img/razasperros.jpeg';
import { Link } from "react-router-dom";
import './Style/LandingPage.css';

const LandingPage = () =>
    <div className='landingPage'>
      <div className='landingPage-image'>
      <img src={image} alt='No se pudo cargar la imagen' />
      </div>
      <div className='landingPage-welcome'>
      <h1>Welcome</h1>
      <Link className='landingPage-welcome-link' to='/home'>
        <button className='button' type='button'> Welcome </button>
      </Link>
      </div>
    </div>;

export default LandingPage;