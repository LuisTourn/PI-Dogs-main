import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Breed.css';

const Breed = ({ name, weight, temperament, image, id }) => {
    id = parseInt(id);
    return (
        <div className="card">
            <div>
                <img src={image} alt="" />
            </div>
            <h4 className="breed-name">{name}</h4>
            <p>Weigth: {weight} kg.</p>
            <p>Temperaments: {temperament}</p>
            <Link to={`/detail/${id}`} image={image}>
                <p className='.detail'>Detail</p>
            </Link>
        </div>
    )
}

export default Breed