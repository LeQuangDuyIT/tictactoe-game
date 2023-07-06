import { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell/Cell';
import GameBoard from './components/GameBoard/GameBoard';
import { getInitialGameBoard, getWinner } from './utils/constants';
import Header from './components/Header/Header';
import WinnerNoti from './components/WinnerNoti/WinnerNoti';

function App() {
    const edgeLength = 12;
    const InitialGameBoard = getInitialGameBoard(edgeLength);
    const [gaming, setGaming] = useState(InitialGameBoard);
    const [player, setPlayer] = useState('O');
    const [timeCountDown, setTimeCountDown] = useState(30000);
    const [winner, setWinner] = useState(null);
    const [showNoti, setShowNoti] = useState(false);

    const handleCheckedCell = cellIndex => {
        if (!winner) {
            const newGaming = gaming.map(cellObj =>
                cellObj.index === cellIndex ? { ...cellObj, checked: player } : cellObj
            );
            setGaming(newGaming);

            const winnerLine = getWinner(cellIndex, newGaming);
            console.log(winnerLine);

            if (winnerLine) {
                setWinner(winnerLine[0].checked);
                setShowNoti(true);
            } else {
                setPlayer(player === 'O' ? 'X' : 'O');
                setTimeCountDown(30000);
            }
        }
    };

    useEffect(() => {
        let intervalId;
        if (!winner) {
            if (timeCountDown > 0) {
                intervalId = setInterval(() => {
                    setTimeCountDown(prevTime => prevTime - 10);
                }, 10);
            } else {
                clearInterval(intervalId);
                const remainingPlayer = player === 'O' ? 'X' : 'O';
                setWinner(remainingPlayer);
            }
        }
        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player, timeCountDown]);

    const handleReview = () => {
        setShowNoti(false);
    };

    const handleNewGame = () => {
        setShowNoti(false);
        setGaming(InitialGameBoard);
        setPlayer(winner === 'O' ? 'X' : 'O');
        setTimeCountDown(30000);
        setWinner(null);
    };

    return (
        <div className="App">
            <Header player={player} winner={winner} timeCountDown={timeCountDown} handleNewGame={handleNewGame} />
            <GameBoard>
                {gaming.map(cell => (
                    <Cell key={cell.index} {...cell} edgeLength={edgeLength} handleCheckedCell={handleCheckedCell} />
                ))}
            </GameBoard>
            {showNoti && <WinnerNoti winner={winner} handleReview={handleReview} handleNewGame={handleNewGame} />}
        </div>
    );
}

export default App;
