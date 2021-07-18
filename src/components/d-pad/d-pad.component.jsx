import React from 'react';

import './d-pad.styles.scss';

import downArrow from './assets/down-arrow.png';
import upArrow from './assets/up-arrow.png';
import rightArrow from './assets/right-arrow.png';
import leftArrow from './assets/left-arrow.png';

const DPad = () => {


    return (
        <div className='d-pad-container'>
            <img className='d-pad-arrows up-arrow' src={upArrow} alt="Up Arrow" />
            <img className='d-pad-arrows left-arrow' src={leftArrow} alt="Left Arrow" />
            <img className='d-pad-arrows right-arrow' src={rightArrow} alt="Right Arrow" />
            <img className='d-pad-arrows down-arrow' src={downArrow} alt="Down Arrow" />
        </div>
    )
}

export default DPad;