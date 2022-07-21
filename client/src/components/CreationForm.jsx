import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBreed } from '../redux/actions';
import validateForm from '../utils';
import './Style/CreationForm.css';

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    minWeight: '',
    maxWeight: '',
    minHeight: '',
    maxHeight: '',
    minLifeSpan: '',
    maxLifeSpan: '',
    temperaments: []
  });

  const dispatch = useDispatch();

  const temps = useSelector(state => state.temperaments);

  const [checked, setChecked] = useState(
    new Array(124).fill(false)
  );
  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    const errorToCheck = validateForm({
      ...input,
      [e.target.name]: e.target.value
    });
    setError(errorToCheck);
    return error;
  };

  const handleTempsOnChange = (position) => {
    const updatedChecked = checked.map((value, index) =>
      index === position ? !value : value
    );

    setChecked(updatedChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewBreed({
      name: `${input.name.split(' ').map(e => `${e.slice(0, 1).toUpperCase()}${e.slice(1).toLowerCase()}`).join(' ')}`,
      weight: (input.minWeight !== input.maxWeight) ? `${input.minWeight} - ${input.maxWeight}` : `${input.minWeight}`,
      height: (input.minHeight !== input.maxHeight) ? `${input.minHeight} - ${input.maxHeight}` : `${input.minHeight}`,
      lifeSpan: (input.minLifeSpan !== input.maxLifeSpan) ? `${input.minLifeSpan} - ${input.maxLifeSpan} years` : `${input.minLifeSpan} years`,
      temperaments: temps.map(e => e.id).filter((e, i) => checked[i] === true)
    }));
    setInput({ name: '', minWeight: '', maxWeight: '', minHeight: '', maxHeight: '', minLifeSpan: '', maxLifeSpan: '', temperaments: [] });
    setChecked(checked.fill(false));
  };

console.log(input.name, Object.keys(error))

  return (
    <form className='form' action='submit' onSubmit={handleSubmit}>
      <h3>Do you want to create a new breed?</h3>
      <p>Fulfill the information below</p>
      <div className='form-name'>
        <label>Name: </label>
        <input
          type='text'
          name='name'
          value={input.name}
          onChange={handleOnChange}
        />
        {error.name && <p className='danger'>{error.name}</p>}
      </div>
      <div className='form-inputs'>
        <label>Weight: &nbsp;</label>
        <label>Min: </label>
        <input
          type='number'
          name='minWeight'
          value={input.minWeight}
          onChange={handleOnChange}
        />
        {error.minWeight && <p className='danger'>{error.minWeight}</p>}
        <label>Max: </label>
        <input
          type='number'
          name='maxWeight'
          value={input.maxWeight}
          onChange={handleOnChange}
        />
        {error.maxWeight && <p className='danger'>{error.maxWeight}</p>}
      </div>
      <div className='form-inputs'>
        <label>Height: &nbsp;</label>
        <label>Min: </label>
        <input
          type='number'
          name='minHeight'
          value={input.minHeight}
          onChange={handleOnChange}
        />
        {error.minHeight && <p className='danger'>{error.minHeight}</p>}
        <label>Max: </label>
        <input
          type='number'
          name='maxHeight'
          value={input.maxHeight}
          onChange={handleOnChange}
        />
        {error.maxHeight && <p className='danger'>{error.maxHeight}</p>}
      </div>
      <div className='form-inputs'>
        <label>Life Span: &nbsp;</label>
        <label>Min: </label>
        <input
          type='number'
          name='minLifeSpan'
          value={input.minLifeSpan}
          onChange={handleOnChange}
        />
        {error.minLifeSpan && <p className='danger'>{error.minLifeSpan}</p>}
        <label>Max: </label>
        <input
          type='number'
          name='maxLifeSpan'
          value={input.maxLifeSpan}
          onChange={handleOnChange}
        />
        {error.maxLifeSpan && <p className='danger'>{error.maxLifeSpan}</p>}
      </div>
      <div>
      <label>Temperaments: </label>
      <select className='form-temperaments' name='temperamentsForm' id='temperamentsFormId'>
        <option value={'tempsFilter'} hidden>Select the temperaments</option>
          {
            temps && temps.map((e, i) =>
              <option type="checkbox" key={e.id} name={`temp${e.name}`} value={e.name} checked={checked[i]}
              onChange={() => handleTempsOnChange(i)}>{e.name}</option>)
          }
        </select>
      </div>
      <button
        type="submit"
        disabled={!input.name || Object.keys(error).length > 0}
        onSubmit={handleSubmit}
      >
        Create Breed
      </button>
    </form>
  );
};

export default Form;