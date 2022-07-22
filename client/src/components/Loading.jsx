import React from 'react';
import './Style/Loading.css'

const Loading = () => {
    return (
        <div className='body'>
            <div className='center'>
                <div className='ring' ></div>
                <span>loading...</span>
            </div>
        </div>
    );
};

export default Loading;