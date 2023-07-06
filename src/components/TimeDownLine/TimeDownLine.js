import React from 'react';

const TimeDownLine = props => {
    const { player, winner, timeCountDown } = props;
    return (
        <div
            className="time-down-bar"
            style={{
                width: !winner && `${(timeCountDown / 30000) * 100}%`,
                background: player === 'O' ? '#3EC5F3' : '#FF615F'
            }}
        ></div>
    );
};

export default TimeDownLine;
