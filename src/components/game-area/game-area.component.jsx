import React, { useState,useEffect } from 'react';
import useEventListener from '@use-it/event-listener'

import './game-area.styles.scss';

import Snake from '../snake/snake.component';
import Food from '../food/food.component';

const GameArea = () => {

    const [snakeDots, setSnakeDots] = useState([
        [10,130],
        [20,130],
        [30,130]
    ]);
    const [snakeFood, setSnakeFood] = useState([30,40]);
    const [direction, setDirection] = useState('RIGHT');

    const handelArrowPress = (event) => {
        // console.log(event.key);
        switch(event.key) {
            case 'ArrowUp':
                setDirection('UP');
                return;
            case 'ArrowDown':
                setDirection('DOWN');
                return;
            case 'ArrowRight':
                setDirection('RIGHT');
                return;
            case 'ArrowLeft':
                setDirection('LEFT');
                return;
        }
    }

    useEventListener('keydown', handelArrowPress);

    return (
        <div className='game-area' >
            <Snake snakeDots={snakeDots} />
            <Food snakeFood={snakeFood} />
        </div>
    )
}

export default GameArea;