import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBreeds } from '../redux/actions'
import Breed from './Breed';
import './Style/Home.css';

const Home = () => {
  const breeds = useSelector(state => state.breeds);
  const breedsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(0);
  const [breedPage, setBreedPage] = useState([]);
/*   const [tempsFilter, setTempsFilter] = useState([]);
  const [] */

  if (breeds.length && !breedPage.length) setBreedPage([...breeds].splice(currentPage, breedsPerPage));
 
  const prevPageHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * breedsPerPage;

    setBreedPage([...breeds].splice(firstIndex, breedsPerPage));
    setCurrentPage(prevPage);
  };

  const nextPageHandler = () => {
    const totalBreeds = breeds.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * breedsPerPage;
    if (firstIndex > totalBreeds) return;

    setBreedPage([...breeds].splice(firstIndex, breedsPerPage));
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <div>
      <h4>{currentPage}</h4>
      <button onClick={prevPageHandler} >Prev</button>
      <button onClick={nextPageHandler} >Next</button>
      </div>
      <div className='container'>
        {
          (breedPage.length > 0 && breedPage.map(e => <Breed
            key={e.id}
            name={e.name}
            weight={e.weight}
            temperament={e.temperament}
            image={e.image}
            id={e.id}
          />))};
      </div>
    </div>
  );
};

export default Home;