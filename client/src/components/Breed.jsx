import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Breed.css';

const Breed = ({ name, weight, temperament, image, id }) => {
    id = parseInt(id);
    return (
        <div className='card'>
            <div className='card-image'>
                <img src={image} alt='Not found' />
            </div>
            <h4 className='card-breedName'>{name}</h4>
            <p>Weigth: {weight} kg</p>
            <p>Temperaments: {temperament}</p>
            <Link to={`/detail/${id}`} image={image}>
                <p className='card-detail'>Detail</p>
            </Link>
        </div>
    )
}

export default Breed