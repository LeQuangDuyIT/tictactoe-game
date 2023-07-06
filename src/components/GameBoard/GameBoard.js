import React from 'react'
import './GameBoard.css'

const GameBoard = (props) => {
    const { children } = props;
  return (
      <div className='game-board'>
        {children}
      </div>
  )
}

export default GameBoard