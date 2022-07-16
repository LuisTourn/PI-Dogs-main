import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBreed } from '../redux/actions';
import { getAllTemperaments } from '../redux/actions';

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

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const temps = useSelector(state => state.temperaments);
  const [checked, setChecked] = useState(
    new Array(124).fill(false)
  );

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
/*     setData({
      ...data,
      name: input.name,
      weight: `${input.minWeight} - ${input.maxWeight}`,
      height: `${input.minHeight} - ${input.maxHeight}`,
      lifeSpan: `${input.minLifeSpan} - ${input.maxLifeSpan} years`
    }) */
  };

  const handleTempsOnChange = (position) => {
    const updatedChecked = checked.map((value, index) =>
      index === position ? !value : value
    );

    setChecked(updatedChecked);
/*     setData({
      ...data,
      temperaments: temps.filter((e, i) => checked[i] === true)
    }); */
  };

/*   const handleCreate = (e) => {
    e.preventDefault();
    setData({
      ...data,
      name: input.name,
      weight: `${input.minWeight} - ${input.maxWeight}`,
      height: `${input.minHeight} - ${input.maxHeight}`,
      lifeSpan: `${input.minLifeSpan} - ${input.maxLifeSpan} years`,
      temperaments: temps.map(e => e.id).filter((e, i) => checked[i] === true)
    });
    alert('A creation request will be send', handleSubmit(e))
  } */

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewBreed({
      name: input.name,
      weight: `${input.minWeight} - ${input.maxWeight}`,
      height: `${input.minHeight} - ${input.maxHeight}`,
      lifeSpan: `${input.minLifeSpan} - ${input.maxLifeSpan} years`,
      temperaments: temps.map(e => e.id).filter((e, i) => checked[i] === true)
    }));
    setInput({ name: '', minWeight: '', maxWeight: '', minHeight: '', maxHeight: '', minLifeSpan: '', maxLifeSpan: '', temperaments: [] });
    setChecked(checked.fill(false));
  };

  return (
    <form action='submit' onSubmit={handleSubmit}>
      <h3>Do you want to create a new breed?</h3>
      <p>Fulfill the information below</p>
      <label>Name: </label>
      <input
        name='name'
        value={input.name}
        onChange={handleOnChange}
      />
      <label>Weight: </label>
      <label>Min: </label>
      <input
        name='minWeight'
        value={input.minWeight}
        onChange={handleOnChange}
      />
      <label>Max: </label>
      <input
        name='maxWeight'
        value={input.maxWeight}
        onChange={handleOnChange}
      />
      <label>Height: </label>
      <label>Min: </label>
      <input
        name='minHeight'
        value={input.minHeight}
        onChange={handleOnChange}
      />
      <label>Max: </label>
      <input
        name='maxHeight'
        value={input.maxHeight}
        onChange={handleOnChange}
      />
      <label>Life Span: </label>
      <label>Min: </label>
      <input
        name='minLifeSpan'
        value={input.minLifeSpan}
        onChange={handleOnChange}
      />
      <label>Max: </label>
      <input
        name='maxLifeSpan'
        value={input.maxLifeSpan}
        onChange={handleOnChange}
      />
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
      <button type="submit">
        Create Breed
      </button>
    </form>
  );
};

export default Form;