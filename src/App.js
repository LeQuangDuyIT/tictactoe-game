import { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell/Cell';
import GameBoard from './components/GameBoard/GameBoard';
import { getInitialGameBoard, getWinner } from './utils/constants';

function App() {
    const edgeLength = 12;
    const InitialGameBoard = getInitialGameBoard(edgeLength);
    const [gaming, setGaming] = useState(InitialGameBoard);
    const [player, setPlayer] = useState('O');
    const [timeCountDown, setTimeCountDown] = useState(30);
    const [winner, setWinner] = useState(null);

    const handleCheckedCell = cellIndex => {
        if (!winner) {
            const newGaming = gaming.map(cellObj =>
                cellObj.index === cellIndex ? { ...cellObj, checked: player } : cellObj
            );
            setGaming(newGaming);
            const winnerLine = getWinner(cellIndex, newGaming);
            setPlayer(player === 'O' ? 'X' : 'O');
            setTimeCountDown(30);
            if (winnerLine) {
                setWinner(winnerLine[0].checked);
            }
            console.log(winnerLine);
        }
    };

    useEffect(() => {
        let intervalId;
        if (timeCountDown > 0 && !winner) {
            intervalId = setInterval(() => {
                setTimeCountDown(prevTime => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
            const remainingPlayer = player === 'O' ? 'X' : 'O';
            setWinner(remainingPlayer);
            console.log(`${remainingPlayer} thắng`);
        }
        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player, timeCountDown]);

    return (
        <div className="App">
            {!winner && timeCountDown}
            <GameBoard>
                {gaming.map(cell => (
                    <Cell key={cell.index} {...cell} edgeLength={edgeLength} handleCheckedCell={handleCheckedCell} />
                ))}
            </GameBoard>
        </div>
    );
}

export default App;
