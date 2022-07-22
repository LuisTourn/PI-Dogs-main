import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBreed } from '../redux/actions';
import validateForm from '../utils';
import './Style/CreationForm.css';

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    image: '',
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

  const [tempsToAdd, setTempsToAdd] = useState([]);
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
 
  };

  const handleTemps = (e) => {
    const selected = e.target.value;
    if (selected === 'temperamentsForm') return;
    if (input.temperaments.includes(e.target.value)) return;
 
    setInput({
      ...input,
      temperaments: [...input.temperaments, selected]
    });
    setTempsToAdd([...tempsToAdd, temps.find(e => e.id === parseInt(selected))]);
  };

  const handleDelete = (x) => {
    console.log(x)
    let takedOut = input.temperaments.filter(e => parseInt(e) !== x.id);
    let temperamentsToAdd = tempsToAdd.filter(e => parseInt(e.id) !== parseInt(x.id));

    setInput({
      ...input,
      temperaments: takedOut
    });
    setTempsToAdd(temperamentsToAdd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBreed = {
      name: `${input.name.split(' ').map(e => `${e.slice(0, 1).toUpperCase()}${e.slice(1).toLowerCase()}`).join(' ')}`,
      image: `${input.image}`,
      weight: (input.minWeight !== input.maxWeight) ? `${input.minWeight} - ${input.maxWeight}` : `${input.minWeight}`,
      height: (input.minHeight !== input.maxHeight) ? `${input.minHeight} - ${input.maxHeight}` : `${input.minHeight}`,
      lifeSpan: (input.minLifeSpan !== input.maxLifeSpan) ? `${input.minLifeSpan} - ${input.maxLifeSpan} years` : `${input.minLifeSpan} years`,
      temperaments: input.temperaments
    };

    dispatch(createNewBreed(newBreed))
      .then(() => {
        let form = document.getElementById('formId');
        form.reset();
      })
    setInput({
      name: '',
      image: '',
      minWeight: '',
      maxWeight: '',
      minHeight: '',
      maxHeight: '',
      minLifeSpan: '',
      maxLifeSpan: '',
      temperaments: []
    });

    setTempsToAdd([]);
  };

  return (
    <form className='form' id='formId' action='submit' onSubmit={handleSubmit}>
      <h3>Do you want to create a new breed?</h3>
      <p className='form-p'>Fulfill the information below</p>
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
      <div className='form-image'>
        <label>Image url: </label>
        <input
          type='text'
          name='image'
          value={input.image}
          onChange={handleOnChange}
        />
        {error.image && <p className='danger'>{error.image}</p>}
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
      <div className='form-temperaments'>
      <label>Temperaments: </label>
      <select className='form-temperaments-select' name='temperamentsForm' id='temperamentsFormId' onChange={e => handleTemps(e)}>
        <option selected value={'tempsFilter'} hidden>Select temperaments</option>
          {
            temps?.map(e =>{
              return <option key={e.id} name={`temp${e.name}`} value={e.id}>{e.name}</option>})
          }
          </select>
          <div>
            {console.log(tempsToAdd)}
            {tempsToAdd?.map(e => {
              console.log(e)
            return ( <span key={e.id} onClick={() => handleDelete(e)}>{`${e.name} `}</span> )})}
          </div>
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