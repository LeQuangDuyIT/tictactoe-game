import { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell/Cell';
import GameBoard from './components/GameBoard/GameBoard';
import Home from './components/Home/Home';
import { gameModes, getInitialGameBoard, getWinner } from './utils/constants';
import Header from './components/Header/Header';
import WinnerNoti from './components/WinnerNoti/WinnerNoti';

function App() {
    const [gameMode, setGameMode] = useState(null);
    const [playingGame, setPlayingGame] = useState(false);
    const [gaming, setGaming] = useState([]);
    const [player, setPlayer] = useState('O');
    const [timeCountDown, setTimeCountDown] = useState(30000);
    const [winner, setWinner] = useState(null);
    const [showNoti, setShowNoti] = useState(false);

    const handlePlayingGame = mode => {
        const modeObj = gameModes.find(modeObj => modeObj.mode === mode);
        const gameBoardArr = getInitialGameBoard(modeObj.edgeLength);
        setGameMode(modeObj);
        setGaming(gameBoardArr);
        setPlayingGame(true);
    };

    const handleCheckedCell = cellIndex => {
        if (!winner) {
            const newGaming = gaming.map(cellObj =>
                cellObj.index === cellIndex ? { ...cellObj, checked: player } : cellObj
            );
            setGaming(newGaming);

            const lineLength = gameMode.lineLength;
            const winnerLine = getWinner(cellIndex, newGaming, lineLength);
            console.log(winnerLine);

            const isFull = newGaming.every(cellObj => cellObj.checked);

            if (winnerLine) {
                setWinner(winnerLine[0].checked);
                setShowNoti(true);
            } else if (isFull) {
                setWinner('XO');
                setShowNoti(true);
                console.log('Hòa');
            } else {
                setPlayer(player === 'O' ? 'X' : 'O');
                setTimeCountDown(30000);
            }
        }
    };

    useEffect(() => {
        let intervalId;
        if (playingGame && !winner) {
            if (timeCountDown > 0) {
                intervalId = setInterval(() => {
                    setTimeCountDown(prevTime => prevTime - 10);
                }, 10);
            } else {
                clearInterval(intervalId);
                const remainingPlayer = player === 'O' ? 'X' : 'O';
                setWinner(remainingPlayer);
                setShowNoti(true);
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
        setGaming(null);
        setPlayer(winner === 'O' ? 'X' : 'O');
        setTimeCountDown(30000);
        setWinner(null);
        setGameMode(null);
        setPlayingGame(false);
    };

    return (
        <div className="App">
            <Header
                player={player}
                playingGame={playingGame}
                winner={winner}
                timeCountDown={timeCountDown}
                handleNewGame={handleNewGame}
            />
            {playingGame ? (
                <>
                    <GameBoard>
                        {gaming.map(cell => (
                            <Cell
                                key={cell.index}
                                {...cell}
                                edgeLength={gameMode.edgeLength}
                                handleCheckedCell={handleCheckedCell}
                            />
                        ))}
                    </GameBoard>
                    {showNoti && (
                        <WinnerNoti winner={winner} handleReview={handleReview} handleNewGame={handleNewGame} />
                    )}
                </>
            ) : (
                <Home handlePlayingGame={handlePlayingGame} />
            )}
            {playingGame && <div className="line-length">Place {gameMode.lineLength} in a row to win</div>}
        </div>
    );
}

export default App;
