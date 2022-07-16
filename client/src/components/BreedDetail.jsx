import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedDetail } from '../redux/actions';
//import './Style/BreedDetail.css';

const BreedDetail = () => {
  const { id } = useParams();
  const breedDetail = useSelector(state => state.breedDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreedDetail(id));
  }, [dispatch, id]);

  return (
      <div className='cardContainer'>
        <div className='image'>
          <img src={breedDetail.image} alt='' />
        </div>
        <div className='description'>
          <h2>{breedDetail.name}</h2>
          <div>Weight: {breedDetail.weight} kg.</div>
          <div>Height: {breedDetail.height} mts.</div>
          <div>Life Span: {breedDetail.lifeSpan}</div>
          <div>Temperaments: {breedDetail.temperament}</div>
        </div>
      </div>
  );
};

export default BreedDetail;