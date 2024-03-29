import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedDetail } from '../redux/actions';
import Loading from './Loading'
import './Style/BreedDetail.css';

const BreedDetail = () => {
  const { id } = useParams();
  const [breedDetail, loading] = useSelector(state => [state.breedDetail, state.loading]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreedDetail(id));
  }, [dispatch, id]);

  return (
    <div className='detailContainer'>
      {loading === true ? <div> <Loading /> </div> :
        <div>
          <div className='detailContainer-image'>
            <img src={breedDetail.image} alt='Not found' />
          </div>
          <div className='detailContainer-description'>
            <h2>{breedDetail.name}</h2>
            <div><span>Weight:</span> &nbsp; {breedDetail.weight} kg</div>
            <div><span>Height:</span> &nbsp; {breedDetail.height} cms</div>
            <div><span>Life Span:</span> &nbsp; {breedDetail.lifeSpan}</div>
            <div className='detailContainer-description-temperaments'><span>Temperaments:</span> &nbsp; {breedDetail.temperament}</div>
          </div>
        </div>
      }
    </div>
  );
};

export default BreedDetail;