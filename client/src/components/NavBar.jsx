import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllBreeds, getAllTemperaments, searchValue, resetBreedSearch } from '../redux/actions';
import SearchBar from './SearchBar';
import './Style/NavBar.css';

const NavBar = ({ setCurrentPage }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);

    const CleanSearch = () => {
        setCurrentPage(0);
        dispatch(searchValue(''))
        dispatch(resetBreedSearch([]))
        dispatch(getAllBreeds())
    };

    return (
        <div className='navbar'>
            <Link onClick={CleanSearch} className='navbar-home' to='/home'>
            <h3>Home</h3>
        </Link>
        <Link className='navbar-create' to='/createbreed'>
            <h3>Create a new breed</h3>
        </Link>
        <SearchBar className='navbar-searchBar' setCurrentPage={setCurrentPage}/>
    </div>
    )};

export default NavBar;