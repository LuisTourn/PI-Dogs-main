import React, { useState } from 'react';
import { getBreedSearch } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Style/SearchBar.css';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const breeds = useSelector(state => state.breeds);

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

    const handleOnClick = () => {
        dispatch(getBreedSearch(search));
        setSearch('');
        setError('');
    };

    return (
        <div className='searchBar'>
            <input
                type='text'
                placeholder='Breed...'
                value={search}
                onChange={handleOnChange}
            />
            <Link className='searchBar-button' to='/search' >
                <button
                    disabled={!search}
                    onClick={handleOnClick}
                    >Search</button>
            </Link>
            {error && <p className='searchBar-danger'>{error}</p>}
        </div>
    )
};

export default SearchBar;