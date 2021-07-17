import React from 'react';

import './snake.styles.scss';

const Snake = ({ snakeDots }) => {

    return (
        <div className='snake-container'>
            {
               snakeDots.map((dot,i) => {
                const style = {
                    left: `${dot[0]}px`,
                    top: `${dot[1]}px`
                } 
                return (
                    <div className='snake-dot' key={i} style={style} />
                )
               }) 
            }
        </div>
    )
}

export default Snake;