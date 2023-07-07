import React from 'react';
import './WinnerNoti.css';
import { playerIcon } from '../../utils/constants';

const WinnerNoti = props => {
    const { winner, handleReview, handleNewGame } = props;
    console.log(winner);
    return (
        <div className="winner-noti__wrap">
            <div className={`winner-noti ${winner === 'O' ? 'o-winner' : winner === 'X' ? 'x-winner' : 'xo-winner'}`}>
                {winner === 'O' && <img src={playerIcon.oPlayer} alt="O" />}
                {winner === 'X' && <img src={playerIcon.xPlayer} alt="X" />}
                {winner === 'XO' && (
                    <div className="xo-winner">
                        <img src={playerIcon.oPlayer} alt="O" />
                        <img src={playerIcon.xPlayer} alt="X" />
                    </div>
                )}
                {winner === 'XO' ? <p>There is no winner</p> : <p>Congrats to the winner!</p>}

                <div className="options-btn">
                    <button onClick={handleReview}>Review</button>
                    <button onClick={handleNewGame}>New Game</button>
                </div>
            </div>
        </div>
    );
};

export default WinnerNoti;
