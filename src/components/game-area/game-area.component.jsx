import React from 'react';
// import useEventListener from '@use-it/event-listener'

import './game-area.styles.scss';

import Snake from '../snake/snake.component';
import Food from '../food/food.component';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 240;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
}

const INITIAL_STATE = {
    snakeDots: [
        [10,130],
        [20,130],
        [30,130]
    ],
    snakeFood: getRandomCoordinates(),
    direction: 'RIGHT'
}

class GameArea extends React.Component {
    constructor() {
        super();

        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        setInterval(this.moveSnake, 1000);
        setInterval(this.updateFoodLocation, 40000);
        document.onkeydown = this.handelArrowPress;
    }

    componentDidUpdate() {
        this.checkOutOfBounds();
    }

    updateFoodLocation = () => {
        this.setState({snakeFood: getRandomCoordinates()});
    }

    handelArrowPress = (event) => {
         console.log(event.key);
        switch(event.key) {
            case 'ArrowUp':
                this.setState({direction: 'UP'});
                break;
            case 'ArrowDown':
                this.setState({direction: 'DOWN'});
                break;
            case 'ArrowRight':
                this.setState({direction: 'RIGHT'});
                break;
            case 'ArrowLeft':
                this.setState({direction: 'LEFT'});
                break;
            default:
                break;
        }   
        // console.log(direction);
        // moveSnake();
    }

    moveSnake = () => {
        
        // console.log(`Moving snake : ${direction}`);
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1]
        // console.log('old dots',dots);
        // console.log('old head',head);

        switch(this.state.direction) {
            case 'UP':
                head = [head[0], head[1] - 10];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 10];
                break;
            case 'RIGHT':
                head = [head[0] + 10, head[1]];
                break;
            case 'LEFT':
                head= [head[0] - 10, head[1]];
                break;
            default:
                break;
        }
        
        dots.push(head);
        dots.shift();   
        // console.log('new head',head);
        // console.log('new dots',dots);
        this.setState({
            snakeDots: dots
          })
    }

    checkOutOfBounds = () => {
        const { snakeDots } = this.state;
        const head = snakeDots[snakeDots.length - 1];
        if(head[0] >= 240 || head[0] < 0 || head[1] >= 240 || head[1] < 0) {
            this.gameOver();
        }
    }

    gameOver = () => {
        alert('Game Over');
        this.setState(INITIAL_STATE);
    }


    // useEventListener('keydown', handelArrowPress);
    render() {
        const { snakeDots,snakeFood } = this.state;
        return (
            <div className='game-area' >
                <Snake snakeDots={snakeDots} />
                <Food snakeFood={snakeFood} />
            </div>
        )
    }
}
    

export default GameArea;