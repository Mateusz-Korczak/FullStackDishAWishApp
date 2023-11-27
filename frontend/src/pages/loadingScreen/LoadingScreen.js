import React from 'react';
import './LoadingScreen.scss';
import Spinner from '../../components/spinner/Spinner';


function LoadingScreen() {
    return (
        <div className="loading-screen">
            <Spinner />
            <p className='loading-text'></p>
        </div>
    );
}


export default LoadingScreen;


