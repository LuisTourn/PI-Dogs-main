import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBreed } from '../redux/actions';
import validateForm from '../utils';
/* import { getAllTemperaments } from '../redux/actions'; */

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

  const temps = useSelector(state => state.temperaments);

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(
    new Array(124).fill(false)
  );
  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    const error = validateForm({
      ...input,
      [e.target.name]: e.target.value
    });
    setError(error);
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
      name: `${input.name.slice(0, 1).toUpperCase()}${input.name.slice(1).toLowerCase()}`,
      weight: (input.minWeight !== input.maxWeight) ? `${input.minWeight} - ${input.maxWeight}` : `${input.minWeight}`,
      height: (input.minHeight !== input.maxHeight) ? `${input.minHeight} - ${input.maxHeight}` : `${input.minHeight}`,
      lifeSpan: (input.minLifeSpan !== input.maxLifeSpan) ? `${input.minLifeSpan} - ${input.maxLifeSpan} years` : `${input.minWeight} years`,
      temperaments: temps.map(e => e.id).filter((e, i) => checked[i] === true)
    }));
    setInput({ name: '', minWeight: '', maxWeight: '', minHeight: '', maxHeight: '', minLifeSpan: '', maxLifeSpan: '', temperaments: [] });
    setChecked(checked.fill(false));
  };

  return (
    <form action='submit' onSubmit={handleSubmit}>
      <h3>Do you want to create a new breed?</h3>
      <p>Fulfill the information below</p>
      <div>
        <label>Name: </label>
        <input
          type='text'
          name='name'
          value={input.name}
          onChange={handleOnChange}
          className={error.name && 'danger'}
        />
        {error.name && <p>{error.name}</p>}
      </div>
      <div>
        <label>Weight: </label>
        <label>Min: </label>
        <input
          type='number'
          name='minWeight'
          value={input.minWeight}
          onChange={handleOnChange}
          className={error.minWeight && 'danger'}
        />
        {error.minWeight && <p>{error.minWeight}</p>}
        <label>Max: </label>
        <input
          type='number'
          name='maxWeight'
          value={input.maxWeight}
          onChange={handleOnChange}
          className={error.maxWeight && 'danger'}
        />
        {error.maxWeight && <p>{error.maxWeight}</p>}
      </div>
      <div>
        <label>Height: </label>
        <label>Min: </label>
        <input
          type='number'
          name='minHeight'
          value={input.minHeight}
          onChange={handleOnChange}
          className={error.minHeight && 'danger'}
        />
        {error.minHeight && <p>{error.minHeight}</p>}
        <label>Max: </label>
        <input
          type='number'
          name='maxHeight'
          value={input.maxHeight}
          onChange={handleOnChange}
          className={error.maxHeight && 'danger'}
        />
        {error.maxHeight && <p>{error.maxHeight}</p>}
      </div>
      <div>
        <label>Life Span: </label>
        <label>Min: </label>
        <input
          type='number'
          name='minLifeSpan'
          value={input.minLifeSpan}
          onChange={handleOnChange}
          className={error.minLifeSpan && 'danger'}
        />
        {error.minLifeSpan && <p>{error.minLifeSpan}</p>}
        <label>Max: </label>
        <input
          type='number'
          name='maxLifeSpan'
          value={input.maxLifeSpan}
          onChange={handleOnChange}
          className={error.maxHeight && 'danger'}
        />
        {error.maxHeight && <p>{error.maxHeight}</p>}
      </div>
      <div>
        <label>Temperaments: </label>
        {/*       <select
        multiple={true}
        value={temperaments}
      /> */}
        <ul>
          {temps.map((e, i) => {
            return (
              <li key={e.id}>
                <div>
                  <input
                    type="checkbox"
                    name={e.name}
                    value={e.name}
                    checked={checked[i]}
                    onChange={() => handleTempsOnChange(i)}
                  />
                  <label>{e.name}</label>
                </div>
              </li>
            );
          })}
        </ul>
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