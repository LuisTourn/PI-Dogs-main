import React from 'react';
import image from '../img/razasperros.jpeg';
import { Link } from "react-router-dom";
import './Style/LandingPage.css';

const LandingPage = () =>
    <div>
      <h1>Welcome to my Dog PI</h1>
      <img src={image} alt='No se pudo cargar la imagen' />
      <Link to='/home'>
        <button className='button' type='button'> Welcome </button>
      </Link>
    </div>;

export default LandingPage;