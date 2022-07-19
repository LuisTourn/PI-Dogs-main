import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Breed from './Breed';
// import './Style/Home.css';

const SearchedBreeds = () => {
  const searchBreeds = useSelector(state => state.searchBreeds);
  const breedsPerPage = 8;

  const [breedPage, setBreedPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  if (searchBreeds.length && !breedPage.length) setBreedPage([...searchBreeds].splice(currentPage, breedsPerPage));

  useEffect(() => {
    setCurrentPage(0);
    setBreedPage([...searchBreeds].splice(0, breedsPerPage));
  }, [searchBreeds]);

  const prevPageHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return
    const firstIndex = prevPage * breedsPerPage;

    setBreedPage([...searchBreeds].splice(firstIndex, breedsPerPage));
    setCurrentPage(prevPage);
  };

  const nextPageHandler = () => {
    const totalBreeds = searchBreeds.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * breedsPerPage;
    if (firstIndex >= totalBreeds) return;

    setBreedPage([...searchBreeds].splice(firstIndex, breedsPerPage));
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <div>
        <h4>{currentPage}</h4>
        <button
          onClick={prevPageHandler} >
          Prev
        </button>
        <button
          onClick={nextPageHandler} >
          Next
        </button>
      </div>
      <div className='container'>
        {
          breedPage && breedPage.map(e => <Breed
            key={e.id}
            name={e.name}
            weight={e.weight}
            temperament={e.temperament}
            image={e.image}
            id={e.id}
          />)
        }
      </div>
    </div>
  );
};

export default SearchedBreeds;