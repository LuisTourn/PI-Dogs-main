import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBreeds, getBreedSearch, orderBreeds, breedsFilter, temperamentsFilter } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import Breed from './Breed';
import Loading from './Loading';
import './Style/Home.css';

const Home = ({ currentPage, setCurrentPage }) => {

  const [breeds, searchBreeds, searched, temps, loading ] = useSelector(state => 
    [state.breeds, state.searchBreeds, state.searched, state.temperaments, state.loading]);
  const breedsPerPage = 8;

  let history = useHistory();

  const [breedPage, setBreedPage] = useState([]);
  const [searchPage, setSearchPage] = useState([]);
  const [order, setOrder] = useState('');
 // const [apiOrDbFilter, setApiOrDbFilter] = useState('');
 // const [tempsFilter, setTempsFilter] = useState('');
//  const [filterDone, setFilterDone] = useState(false);

console.log('breedPage', breedPage)
console.log(searchPage)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);

  if (breeds.length && !breedPage.length && !searchPage.length) {
    setBreedPage([...breeds].splice(currentPage, breedsPerPage));
  };
  if (searched !== '' && !breedPage.length && !searchPage.length) {
    setBreedPage([...breeds].splice(currentPage, breedsPerPage));
    setSearchPage([...searchBreeds].splice(currentPage, breedsPerPage));
  };

  //Manejador de ordenamientos alfabetico y por peso
  const orderHandler = (e) => {
    setCurrentPage(0);
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
    } else {   //cualquier cosa se borra
      dispatch(orderBreeds(order));
    };
    history.push('/home')
  };
  
/*   useEffect(() => {
    setBreedPage([...breeds].splice(currentPage * breedsPerPage, breedsPerPage));
  }, [order, breeds, currentPage]); */

  //Filtro de data por Api o Db
  const filterDataSource = (e) => {

    const filter = e.target.value;
    if (filter === 'dataFilter') return;
/*    if (filter !== apiOrDbFilter) {
      setApiOrDbFilter(filter);
      setCurrentPage(0);
      dispatch(getAllBreeds())
      .then(() => dispatch(breedsFilter(filter)));
    }; */

    setCurrentPage(0);
    dispatch(getAllBreeds())
    .then(() => dispatch(breedsFilter(filter)));
  };

/*   useEffect(() => {
    setBreedPage([...breeds].splice(currentPage, breedsPerPage));
  }, [currentPage, apiOrDbFilter, breeds]); */

  useEffect(() => {
    if (searchBreeds.length > 0) {
      return setSearchPage([...searchBreeds].splice(currentPage * breedsPerPage, breedsPerPage))
    }
    setBreedPage([...breeds].splice(currentPage * breedsPerPage, breedsPerPage));
  }, [breeds, searchBreeds, currentPage/* , order */]);

  //Filtro de data por temperamentos
  const filterTemperaments = (e) => {
    const name = e.target.value;
/*     if (name === 'tempsFilter') return;
    if (tempsFilter !== name) {
      setTempsFilter(name);
      setCurrentPage(0);
      dispatch(temperamentsFilter(name));
    }; */

    setCurrentPage(0);
    if (searched === '') {
      dispatch(getAllBreeds())
      .then(() => dispatch(temperamentsFilter(name)));
    } else {
      dispatch(getBreedSearch(searched))
      .then(() => dispatch(temperamentsFilter(name)));
    };
  };

 /*  useEffect(() => {
    setBreedPage([...filterBreeds].splice(currentPage, breedsPerPage));
  }, [currentPage, filterBreeds]); */

  //Paginado
  const prevPageHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * breedsPerPage;
    const searchIndex = prevPage * breedsPerPage;

    setBreedPage([...breeds].splice(firstIndex, breedsPerPage));
    setSearchPage([...searchBreeds].splice(searchIndex, breedsPerPage));
    setCurrentPage(prevPage);
  };

  const nextPageHandler = () => {
    var totalBreeds;
    if (searched === '') {
      totalBreeds = breeds.length;
    } else {
      totalBreeds = searchBreeds.length;
    };

    const nextPage = currentPage + 1;
    const firstIndex = nextPage * breedsPerPage;
    console.log('firstIndex', firstIndex)
    const totalSearched = searchBreeds.length;
    const searchIndex = nextPage * breedsPerPage;

    if (firstIndex >= totalBreeds || (searchIndex >= totalSearched && searchBreeds.length)) return
    setBreedPage([...breeds].splice(firstIndex, breedsPerPage));
    setSearchPage([...searchBreeds].splice(searchIndex, breedsPerPage));
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
        <select name='dataSource' id='dataSourceId' onChange={filterDataSource}>
          <option value={'dataFilter'} hidden>Data Source Filter</option>
          <option value={'api'}> API Breeds</option>
          <option value={'db'}> DB Breeds</option>
        </select>
      </div>
      <div className='home-selects-filters'>
        <select name='temperaments' id='temperamentsId' onChange={filterTemperaments}>
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
        {(loading === true ? <div> <Loading /> </div> : searched === '' ? (breedPage && breedPage.map(e => <Breed
            key={e.id}
            name={e.name}
            weight={e.weight}
            temperament={e.temperament}
            image={e.image}
            id={e.id}
          />)) : 
          (searchPage && searchPage.map(e => <Breed
            key={e.id}
            name={e.name}
            weight={e.weight}
            temperament={e.temperament}
            image={e.image}
            id={e.id}
          />)))}
      </div>
    </div>
  );
};

export default Home;