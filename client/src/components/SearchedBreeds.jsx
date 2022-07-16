import React from 'react';
import { useSelector } from 'react-redux';
import Breed from './Breed';
// import './Style/Home.css';

const SearchedBreeds = () => {
  const filterBreeds = useSelector(state => state.filterBreeds);

  return (
    <div className='container'>
      {
        filterBreeds && filterBreeds.map(e =><Breed
          key={e.id}
          name={e.name}
          weight={e.weight}
          temperament={e.temperament}
          image={e.image}
          id={e.id}
        />)
      }
    </div>
  );
};

export default SearchedBreeds;