import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllTemperaments } from '../redux/actions';
import SearchBar from './SearchBar';
import './Style/NavBar.css';

const NavBar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTemperaments());
      }, [dispatch]);

    return (
    <div className='navbar'>
        <Link className='navbar-home' to='/home'>
            <h3>Home</h3>
        </Link>
        <Link className='navbar-create' to='/createbreed'>
            <h3>Create a new breed</h3>
        </Link>
        <SearchBar className='navbar-searchBar' />
    </div>
    )};

export default NavBar;