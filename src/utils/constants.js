export const playerIcon = {
    oPlayer: '/assets/o-player.png',
    xPlayer: '/assets/x-player.png'
};

export const gameModes = [
    {
        mode: '3x3',
        edgeLength: 3,
        lineLength: 3,
        img: '/assets/3x3.png'
    },
    {
        mode: '5x5',
        edgeLength: 5,
        lineLength: 4,
        img: '/assets/5x5.png'
    },
    {
        mode: '7x7',
        edgeLength: 7,
        lineLength: 4,
        img: '/assets/7x7.png'
    },
    {
        mode: '12x12',
        edgeLength: 12,
        lineLength: 5,
        img: '/assets/12x12.png'
    },
]

export const getInitialGameBoard = edgeLength => {
    let matrix = [];
    let index = 1;
    for (let y = 1; y <= edgeLength; y++) {
        for (let x = 1; x <= edgeLength; x++) {
            const newCell = { index: index, x: x, y: y, checked: null };
            matrix = [...matrix, newCell];
            index++;
        }
    }
    return matrix;
};

export const getWinner = (justCheckedId, matrix, lineLength) => {
    const cellJustChecked = matrix.find(cellObj => cellObj.index === justCheckedId);
    const { x, y, checked } = cellJustChecked;

    let winLine = null;
    let horizontalLine = [cellJustChecked];
    let verticalLine = [cellJustChecked];
    let diagonalLine = [cellJustChecked];

    for (let i = 1; i <= lineLength; i++) {
        const nextCell = matrix.filter(
            cellObj => cellObj.y === y && Math.abs(cellObj.x - x) === i && cellObj.checked === checked
        );
        if (nextCell.length > 0) {
            horizontalLine = [...horizontalLine, ...nextCell];
            if (horizontalLine.length >= lineLength) {
                winLine = horizontalLine;
            }
        } else break;
    }

    for (let i = 1; i <= lineLength; i++) {
        const nextCell = matrix.filter(
            cellObj => cellObj.x === x && Math.abs(cellObj.y - y) === i && cellObj.checked === checked
        );
        if (nextCell.length > 0) {
            verticalLine = [...verticalLine, ...nextCell];
            if (verticalLine.length >= lineLength) {
                winLine = verticalLine;
            }
        } else break;
    }

    for (let i = 1; i <= lineLength; i++) {
        const nextCell = matrix.filter(
            cellObj => Math.abs(cellObj.x - x) === i && Math.abs(cellObj.y - y) === i && cellObj.checked === checked
        );
        if (nextCell.length > 0) {
            diagonalLine = [...diagonalLine, ...nextCell];
            if (diagonalLine.length >= lineLength) {
                winLine = diagonalLine;
            }
        } else break;
    }

    if (winLine && winLine.length === lineLength) {
        winLine = winLine.sort((cellObj, nextCellObj) => cellObj.index - nextCellObj.index);
        return winLine;
    }

    return null;
};
