import React, { useState } from 'react';
import { gameModes } from '../../utils/constants';
import './Home.css';

const Home = props => {
    const [mode, setMode] = useState('3x3');
    const { handlePlayingGame } = props;

    return (
        <div className="home">
            <div className="game-modes">
                {gameModes.map(modeObj => (
                    <div key={modeObj.mode} className="mode-option__wrap">
                        <div className={`mode-option ${modeObj.mode === mode ? 'mode-checked' : ''}`} onClick={() => setMode(modeObj.mode)}>
                            <img src={modeObj.img} alt={modeObj.mode} />
                            <h3>{modeObj.mode}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <button className="playing-game-btn" onClick={() => handlePlayingGame(mode)}>
                New Game
            </button>
        </div>
    );
};

export default Home;
