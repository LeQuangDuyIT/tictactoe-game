import React, { useState } from 'react';
import { gameModes } from '../../utils/constants';
import './Home.css';

const Home = props => {
    const [mode, setMode] = useState(null);
    const { handlePlayingGame } = props;

    return (
        <div className="home">
            <div className="game-modes">
                {gameModes.map(mode => (
                    <div className="mode-option__wrap">
                        <div key={mode.mode} className="mode-option" onClick={() => setMode(mode.mode)}>
                            <img src={mode.img} alt={mode.mode} />
                            <h3>{mode.mode}</h3>
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
