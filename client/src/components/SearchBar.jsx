import React, { useState } from 'react';
import { getBreedSearch } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const breeds = useSelector(state => state.breeds);

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        console.log(e.target.value)
        if(e.target.value === '') {
            setError('');
            setSearch(e.target.value);
        } else if (breeds.find(dog => dog.name.toLowerCase().includes(e.target.value.toLowerCase()))) {
            setSearch(e.target.value);
        } else if (breeds.find(dog => dog.name.toLowerCase().includes(e.target.value.toLowerCase()))) {
            setError('No matches found');
        }
    };

    const handleOnClick = () => {
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
            {(error && <p>{error}</p>)}
            <Link to='/search' >
                <button
                    disabled={!search}
                    onClick={handleOnClick}>Search</button>
            </Link>
        </div>
    )
};

export default SearchBar;