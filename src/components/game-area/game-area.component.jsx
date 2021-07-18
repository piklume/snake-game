import React from 'react';
import './game-area.styles.scss';

import Snake from '../snake/snake.component';
import Food from '../food/food.component';
import CustomButton from '../custom-button/custom-button.component';
import DPad from '../d-pad/d-pad.component';

const getRandomCoordinates = () => { // This is generate random coordinates for the food
    let min = 1;
    let max = 240;
    let x = Math.floor((Math.random()*(max-min+1)+min)/10)*10;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/10)*10;
    return [x,y]
}

const INITIAL_STATE = { // Initial state of the snake game
    snakeDots: [
        [10,130],
        [20,130],
        [30,130]
    ],
    snakeFood: getRandomCoordinates(),
    direction: 'RIGHT',
    score: 0,
    buttonText: 'Start',
    isGameRunning: false,
    snakeSpeed: 500,
    foodSpwanRate: 40000
}

class GameArea extends React.Component {
    constructor() {
        super();
        
        this.state = INITIAL_STATE;
    }

    startSnake = 0
    startFood = 0
    
    componentDidMount() {   
        // setInterval(this.updateFoodLocation, 40000); // This will update the food location after 40sec   
        document.onkeydown = this.handelArrowPress;
    }

    componentDidUpdate() {
        this.checkSnakeConsumption(); // This is to handel when the snake eats the food
        this.checkIfCollapsed(); // Added this mechanic where the game ends if the snake bites itself
        if (this.state.isGameRunning === false) {
            clearInterval(this.startSnake);
            clearInterval(this.startFood);
        }
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

    handelDPadClick = (event) => {
        console.log(event.target.id);
        switch(event.target.id) {
            case 'up-arrow':
                this.setState({direction: 'UP'});
                break;
            case 'down-arrow':
                this.setState({direction: 'DOWN'});
                break;
            case 'right-arrow':
                this.setState({direction: 'RIGHT'});
                break;
            case 'left-arrow':
                this.setState({direction: 'LEFT'});
                break;
            default:
                break;
        }   
    }

    moveSnake = () => { 
        // This has the logic for normal movement of snake as well as wrap around
        // when it reaches the boundary 
        
        // console.log(`Moving snake : ${direction}`);
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1]
        // console.log('old dots',dots);
        // console.log('old head',head);

        switch(this.state.direction) {
            case 'UP':
                head = (head[1] - 10 >= 0) ?
                [head[0], head[1] - 10]
                : [head[0], 250];
                break;
            case 'DOWN':
                head = (head[1] + 10 <= 250) ?
                 [head[0], head[1] + 10]
                 : [head[0], 0];
                break;
            case 'RIGHT':
                head = (head[0] + 10 <= 250 ) ?
                 [head[0] + 10, head[1]]
                 : [0, head[1]];
                break;
            case 'LEFT':
                head= (head[0] - 10 >= 0) ?
                 [head[0] - 10, head[1]]
                 : [250, head[1]];
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

    gameOver = () => { // Game over state 
        alert(`Game Over!! Your snake bit itself! Score: ${this.state.score}`);
        this.setState(INITIAL_STATE);
    }

    enlargeSnake() { // This will increase the length of snake by 1 dot
        let dots = [...this.state.snakeDots];
        dots.unshift([])
        this.setState({
          snakeDots: dots
        })
    }

    checkIfCollapsed() { // This is to trigger the game over state when the snake bites itself
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
          if (head[0] === dot[0] && head[1] === dot[1]) {
            this.gameOver();
          }
        })
    }

    increaseSpeed() {
        const { snakeSpeed,foodSpwanRate } = this.state;
        
        this.setState({
        snakeSpeed: (snakeSpeed - 20) > 50 ? (snakeSpeed - 20) : 50,
        foodSpwanRate: (foodSpwanRate - 500) > 3000 ? (foodSpwanRate - 500) : 500
        })
        
        this.startGame();
      }

    checkSnakeConsumption = () => { // Handels the snake food consumption
        const { snakeDots,snakeFood,score } = this.state;
        const head = snakeDots[snakeDots.length - 1];

        if(head[0] === snakeFood[0] && head[1] === snakeFood[1]) {
            this.enlargeSnake();
            this.updateFoodLocation();
            this.increaseSpeed();
            this.setState({score: score + 1});
        }
    }
    
    startGame() {   
        clearInterval(this.startSnake);
        clearInterval(this.startFood);

        this.startSnake = setInterval(() => {
            this.moveSnake();
            console.log(`Moving snake with speed: ${this.state.snakeSpeed}`)
        }, this.state.snakeSpeed);

        this.startFood = setInterval(() => {
            this.updateFoodLocation();
            console.log(`Updating food spawn with ferquency: ${this.state.foodSpwanRate}`)
        }, this.state.foodSpwanRate)
    }

    handelClick = () => { // Click handler from start/stop states of the game
        const { buttonText } = this.state;
        if(buttonText === 'Start') {          
            this.setState({buttonText: 'Stop', isGameRunning: true});
            this.startGame();
        } else {   
            this.setState({buttonText: 'Start',isGameRunning: false});
        }
        
    }

    render() {
        const { snakeDots,snakeFood,score,buttonText } = this.state;
        return (
            <div className='game-page'>
                <h2>Play snake!</h2>
                <h3>Score: {score}</h3>
                <div className='game-area' >
                    <Snake snakeDots={snakeDots} />
                    <Food snakeFood={snakeFood} />
                </div>
                <CustomButton
                onClick={this.handelClick}
                >{buttonText}</CustomButton>
                <DPad handelDPadClick={this.handelDPadClick} />
            </div>
        )
    }
}
    

export default GameArea;