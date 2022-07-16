import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllBreeds } from '../redux/actions';
import SearchBar from './SearchBar';

const NavBar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBreeds());
    }, [dispatch]);

    return (
        <div className='navbar'>
            <Link to='/home'>
                <h3>Home</h3>
            </Link>
            <Link to='/createbreed'>
                <h3>Create a new breed</h3>
            </Link>
            <SearchBar />
        </div>
    );
};

export default NavBar;