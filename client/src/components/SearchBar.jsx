import React, { useState } from 'react';
import { getBreedSearch } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    };

    const handleOnClick = (e) => {
        dispatch(getBreedSearch(search));
        setSearch('');
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Breed...'
                value={search}
                onChange={handleOnChange}
            />
            <Link to='/search' >
            <button 
            disabled={!search}
            onClick={handleOnClick}>Search</button>
            </Link>
        </div>
    )
};

export default SearchBar;