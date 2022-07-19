import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderBreeds, breedsFilter } from '../redux/actions'
import Breed from './Breed';
import './Style/Home.css';

const Home = () => {
  const [breeds, filterBreeds /*, temps */] = useSelector(state => [state.breeds, state.filterBreeds/* , state.temperaments */]);
  const breedsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(0);
  const [breedPage, setBreedPage] = useState([]);
 // const [tempsFilter, setTempsFilter] = useState('');
  const [order, setOrder] = useState('');
  const [apiOrDbFilter, setApiOrDbFilter] = useState([]);

  if (breeds.length && !breedPage.length) setBreedPage([...breeds].splice(currentPage, breedsPerPage));

  /*   const handleTempsOnChange = (e) => {
      setTempsFilter(e.target.value);
      console.log(tempsFilter)
      setBreedPage([...breeds].filter(e => e.temperament.includes(tempsFilter)).splice(currentPage, breedsPerPage));
      console.log(breedPage)
    } */

  const dispatch = useDispatch();

  const orderHandler = (e) => {
    const select = e.target.value;
    if (select === 'alphabeticOrder' || select === 'weightOrder') return
    if (order !== select) {
      setOrder(select)
      dispatch(orderBreeds(select));
    };
  };
  
  useEffect(() => {
    setBreedPage([...breeds].splice(currentPage * breedsPerPage, breedsPerPage));
  }, [order, breeds, currentPage]);

  
  const prevPageHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return
    const firstIndex = prevPage * breedsPerPage;

    setBreedPage([...breeds].splice(firstIndex, breedsPerPage));
    setCurrentPage(prevPage);
  };

  const nextPageHandler = () => {
    const totalBreeds = breeds.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * breedsPerPage;
    if (firstIndex >= totalBreeds) return;

    setBreedPage([...breeds].splice(firstIndex, breedsPerPage));
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <div>
        {/*         <input
          type='text'
          name='tempsFilter'
          placeholder={`${}`}
          value={tempsFilter}
          onChange={handleTempsOnChange}
        /> */}
        <h4>{currentPage}</h4>
        <button
          onClick={prevPageHandler} >
          Prev
        </button>
        <button
          onClick={nextPageHandler} >
          Next
        </button>
{/*         <button
          name='az'
          onClick={OrderHandler}>
          A - Z
        </button>
        <button
          name='za'
          onClick={OrderHandler}>
          Z - A
        </button> */}
        <select name='alphabet' onClick={(e) => orderHandler(e)}>
          <option value={'alphabeticOrder'} hidden>Alphabetic Order</option>
          <option value={'az'}>🔼 A - Z 🔽</option>
          <option value={'za'}>🔽 Z - A 🔼</option>
        </select>
        <select name='weight' onClick={(e) => orderHandler(e)}>
          <option value={'weightOrder'} hidden>Weight Order</option>
          <option value={'maxHigherWeight'}>🔼 Max Weight 🔽</option>
          <option value={'minHigherWeight'}>🔽 Max Weight 🔼</option>
          <option value={'maxLowerWeight'}>🔼 Min Weight 🔽</option>
          <option value={'minLowerWeight'}>🔽 Min Weight 🔼</option>
        </select>
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
          />))}
      </div>
    </div>
  );
};

export default Home;