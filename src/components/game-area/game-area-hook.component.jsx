// Tried to do this using hooks but running into some error, so doing this using class components instead.
// This file is not being used in the code thus.

// import React, { useState,useEffect } from 'react';
// import useEventListener from '@use-it/event-listener'

// import './game-area.styles.scss';

// import Snake from '../snake/snake.component';
// import Food from '../food/food.component';

// const GameArea = () => {

//     const [snakeDots, setSnakeDots] = useState([
//         [10,130],
//         [20,130],
//         [30,130]
//     ]);
//     const [snakeFood, setSnakeFood] = useState([30,40]);
//     const [direction, setDirection] = useState('RIGHT');

   

//     const handelArrowPress = (event) => {
//          console.log(event.key);
//         switch(event.key) {
//             case 'ArrowUp':
//                 setDirection('UP');
//                 break;
//             case 'ArrowDown':
//                 setDirection('DOWN');
//                 break;
//             case 'ArrowRight':
//                 setDirection('RIGHT');
//                 break;
//             case 'ArrowLeft':
//                 setDirection('LEFT');
//                 break;
//             default:
//                 break;
//         }   
//         console.log(direction);
//         // moveSnake();
//     }

//     const moveSnake = () => {
        
//         console.log(`Moving snake : ${direction}`);
//         let dots = [...snakeDots];
//         let head = dots[dots.length - 1]
//         // console.log('old dots',dots);
//         // console.log('old head',head);

//         switch(direction) {
//             case 'UP':
//                 head = [head[0], head[1] - 10];
//                 break;
//             case 'DOWN':
//                 head = [head[0], head[1] + 10];
//                 break;
//             case 'RIGHT':
//                 head = [head[0] + 10, head[1]];
//                 break;
//             case 'LEFT':
//                 head= [head[0] - 10, head[1]];
//                 break;
//             default:
//                 break;
//         }
        
//         dots.push(head);
//         dots.shift();   
//         // console.log('new head',head);
//         // console.log('new dots',dots);
//         setSnakeDots(dots);
//     }

//     useEffect(
//         () => {
//             setInterval(() => moveSnake(), 1000);
//         },[snakeDots,direction]
//     )

//     useEventListener('keydown', handelArrowPress);
//     return (
//         <div className='game-area' >
//             <Snake snakeDots={snakeDots} />
//             <Food snakeFood={snakeFood} />
//         </div>
//     )
// }

// export default GameArea;