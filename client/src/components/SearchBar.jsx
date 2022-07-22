import React, { useState } from 'react';
import { getBreedSearch, searchValue } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory } from 'react-router-dom';
import './Style/SearchBar.css';

const SearchBar = ({ setCurrentPage }) => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    let history = useHistory();

    const breeds = useSelector(state => state.all);

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        if(e.target.value === '') {
            setError('');
            setSearch(e.target.value);
        } else if (breeds.find(dog => dog.name.toLowerCase().includes(e.target.value.toLowerCase()))) {
            setSearch(e.target.value);
        } else if (!breeds.find(dog => dog.name.toLowerCase().includes(e.target.value.toLowerCase()))) {
            setError('No matches found');
        }
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        dispatch(getBreedSearch(search));
        dispatch(searchValue(search));
        setSearch('');
        setError('');
        history.push('/home');
    };

    return (
        <div className='searchBar'>
            <input
                type='text'
                placeholder='Breed...'
                value={search}
                onChange={handleOnChange}
            />
            <div className='searchBar-button'>
                <button
                    disabled={!search}
                    onClick={handleOnClick}
                    >Search</button>
            </div>
            {error && <p className='searchBar-danger'>{error}</p>}
        </div>
    );
};

export default SearchBar;