import React from 'react';
import './Header.css';
import { playerIcon } from '../../utils/constants';
import TimeDownLine from '../TimeDownLine/TimeDownLine';

const Header = props => {
    const { playingGame, player, winner, timeCountDown, handleNewGame } = props;
    return (
        <div className="header">
            <div className="top-bar">
                <h2 className="game-title">Tic Tac Toe</h2>
                <button className={`new-game-btn ${player === 'X' ? 'x-player' : 'o-player'}`} onClick={handleNewGame}>
                    <i className="fa-solid fa-reply fa-2xl"></i>
                    <p>New Game</p>
                </button>
            </div>
            {playingGame ? (
                <div className="player-space">
                    {player === 'O' && (
                        <>
                            <img src={playerIcon.oPlayer} alt="O" />
                            <h1 className="o-player">Player 1 to move</h1>
                        </>
                    )}
                    {player === 'X' && (
                        <>
                            <img src={playerIcon.xPlayer} alt="X" />
                            <h1 className="x-player">Player 2 to move</h1>
                        </>
                    )}
                </div>
            ) : (
                    <div className='o__vs__x'>
                        <img src={playerIcon.oPlayer} alt="O" />
                        <p>vs</p>
                        <img src={playerIcon.xPlayer} alt="X" />
                    </div>
            )}
            <TimeDownLine player={player} winner={winner} timeCountDown={timeCountDown} />
        </div>
    );
};

export default Header;
