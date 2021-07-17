import React from 'react';
// import useEventListener from '@use-it/event-listener'

import './game-area.styles.scss';

import Snake from '../snake/snake.component';
import Food from '../food/food.component';
import CustomButton from '../custom-button/custom-button.component';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 240;
    let x = Math.floor((Math.random()*(max-min+1)+min)/10)*10;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/10)*10;
    return [x,y]
}

const INITIAL_STATE = {
    snakeDots: [
        [10,130],
        [20,130],
        [30,130]
    ],
    snakeFood: getRandomCoordinates(),
    direction: 'RIGHT',
    score: 0,
    buttonText: 'Start',
    isGameRunning: false
}

class GameArea extends React.Component {
    constructor() {
        super();

        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        
        setInterval(this.updateFoodLocation, 40000);
        document.onkeydown = this.handelArrowPress;
    }

    componentDidUpdate() {
        this.checkOutOfBounds();
        this.checkSnakeConsumption();
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

    checkSnakeConsumption = () => {
        const { snakeDots,snakeFood,score } = this.state;
        const head = snakeDots[snakeDots.length - 1];

        if(head[0] === snakeFood[0] && head[1] === snakeFood[1]) {
            this.updateFoodLocation();
            this.setState({score: score + 1});
        }
    }

    // startGame = setInterval(this.moveSnake, 1000);

    // var helloEverySecond = setInterval(function() { console.log("hello");}, 1000);
    // clearInterval(helloEverySecond);
    handelClick = () => {
        // alert('clicked');
        const { buttonText } = this.state;
        if(buttonText === 'Start') {          
            // let startGame = setInterval(this.moveSnake , 1000);
            this.setState({buttonText: 'Stop', isGameRunning: true});
            
            let startGame = setInterval(() => {
                this.moveSnake(); 
                if (this.state.isGameRunning === false) {
                    clearInterval(startGame);
                }
            }                
            , 1000);

        } else {   
            this.setState({buttonText: 'Start',isGameRunning: false});
            // clearInterval(startGame);
        }
        
    }

    // useEventListener('keydown', handelArrowPress);
    render() {
        const { snakeDots,snakeFood,score,buttonText } = this.state;
        return (
            <div className='game-page'>
                <h2>Score: {score}</h2>
                <div className='game-area' >
                    <Snake snakeDots={snakeDots} />
                    <Food snakeFood={snakeFood} />
                </div>
                <CustomButton
                onClick={this.handelClick}
                >{buttonText}</CustomButton>
            </div>
        )
    }
}
    

export default GameArea;