import React from 'react';

import './food.styles.scss';

const Food = ({ snakeFood }) => {
    const style = {
        left: `${snakeFood[0]}px`,
        top: `${snakeFood[1]}px`
    } 
    return (
        <div className='snake-food' style={style} />
    )
}

export default Food;