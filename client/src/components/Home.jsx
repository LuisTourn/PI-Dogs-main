import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBreeds, orderBreeds, breedsFilter, temperamentsFilter } from '../redux/actions'
import Breed from './Breed';
import './Style/Home.css';

const Home = () => {
  const [breeds, filterBreeds , temps ] = useSelector(state => [state.breeds, state.filterBreeds, state.temperaments]);
  const breedsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(0);
  const [breedPage, setBreedPage] = useState([]);
  const [order, setOrder] = useState('');
  const [apiOrDbFilter, setApiOrDbFilter] = useState('');
  const [tempsFilter, setTempsFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);

  if (breeds.length && !breedPage.length) setBreedPage([...breeds].splice(currentPage, breedsPerPage));

  //Manejador de ordenamientos alfabetico y por peso
  const orderHandler = (e) => {
    const select = e.target.value;
    let optionsAlphabet = document.getElementById('alphabetId');
    let optionsWeight = document.getElementById('weightId');
    if (e.target.id === 'weightId') {
      for (var i = 0; i < optionsAlphabet.length; i++) {
        optionsAlphabet[i].selected = optionsAlphabet[i].defaultSelected;
      };
    };
    if (e.target.id === 'alphabetId') {
      for (var j = 0; j < optionsWeight.length; j++) {
        optionsWeight[j].selected = optionsWeight[j].defaultSelected;
      };
    };
    if(select === 'alphabetOrder' || select === 'weightOrder') return
    if (order !== select) {
      setOrder(select);
      dispatch(orderBreeds(select));
    };
  };
  
  useEffect(() => {
    setBreedPage([...breeds].splice(currentPage * breedsPerPage, breedsPerPage));
  }, [order, breeds, currentPage]);

  //Filtro de data por Api o Db
  const filterDataSource = (e) => {
    const filter = e.target.value;
    if (filter === 'dataFilter') return;
    if (filter !== apiOrDbFilter) {
      setApiOrDbFilter(filter);
      dispatch(breedsFilter(filter));
    };
  };

  useEffect(() => {
    setBreedPage([...filterBreeds].splice(0, breedsPerPage));
  }, [dispatch, apiOrDbFilter, filterBreeds]);

  //Filtro de data por temperamentos
  const filterTemperaments = (e) => {
    const name = e.target.value;
    if (name === 'tempsFilter') return;
    if (tempsFilter !== name) {
      setTempsFilter(name);
      dispatch(temperamentsFilter(name));
    };
  };

  useEffect(() => {
    setBreedPage([...filterBreeds].splice(0, breedsPerPage));
  }, [dispatch, tempsFilter, filterBreeds]);

  //Paginado
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
    if (firstIndex >= totalBreeds) return;

    setBreedPage([...breeds].splice(firstIndex, breedsPerPage));
    setCurrentPage(nextPage);
  };

  return (
    <div className='home'>
       <div className='home-selects'>
        <div className='home-selects-orders'>
        <select id='alphabetId' onClick={orderHandler}>
          <option selected value={'alphabetOrder'} hidden>Alphabetic Order</option>
          <option value={'az'}>⇈ A - Z ⇊</option>
          <option value={'za'}>⇊ Z - A ⇈</option>
        </select>
        </div>
        <div className='home-selects-orders'>
        <select id='weightId' onClick={orderHandler}>
          <option selected value={'weightOrder'} hidden>Weight Order</option>
          <option value={'maxHigherWeight'}>⇈ Max Weight ⇊</option>
          <option value={'minHigherWeight'}>⇊ Max Weight ⇈</option>
          <option value={'maxLowerWeight'}>⇈ Min Weight ⇊</option>
          <option value={'minLowerWeight'}>⇊ Min Weight ⇈</option>
        </select>
      </div>
      <div className='home-selects-filters'>
        <select name='dataSource' id='dataSourceId' onClick={filterDataSource}>
          <option value={'dataFilter'} hidden>Data Source Filter</option>
          <option value={'api'}> API Breeds</option>
          <option value={'db'}> DB Breeds</option>
        </select>
      </div>
      <div className='home-selects-filters'>
        <select name='temperaments' id='temperamentsId' onClick={filterTemperaments}>
        <option value={'tempsFilter'} hidden>Temperament Filter</option>
          {
            temps && temps.map((e, i) =>
              <option key={e.id} name={`temp${e.name}`} value={e.name}>{e.name}</option>)
          }
        </select>
      </div>
      </div>
      <div className='home-pagination'>
        <button
          className='home-pagination-prevButton'
          onClick={prevPageHandler} >
          ⇇ Prev
        </button>
        <h4>{currentPage}</h4>
        <button
          className='home-pagination-nextButton'
          onClick={nextPageHandler} >
          Next ⇉
        </button>
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