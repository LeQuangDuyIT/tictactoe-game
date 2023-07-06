export const playerIcon = {
    oPlayer: '/assets/o-player.png',
    xPlayer: '/assets/x-player.png'
};

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

export const getWinner = (justCheckedId, matrix) => {
    const cellJustChecked = matrix.find(cellObj => cellObj.index === justCheckedId);
    const { x, y, checked } = cellJustChecked;

    let winLine = null;
    let horizontalLine = [cellJustChecked];
    let verticalLine = [cellJustChecked];
    let diagonalLine = [cellJustChecked];

    for (let i = 1; i <= 5; i++) {
        const nextCell = matrix.filter(
            cellObj => cellObj.y === y && Math.abs(cellObj.x - x) === i && cellObj.checked === checked
        );
        if (nextCell.length > 0) {
            horizontalLine = [...horizontalLine, ...nextCell];
            if (horizontalLine.length >= 5) {
                winLine = horizontalLine;
            }
        } else break;
    }

    for (let i = 1; i <= 5; i++) {
        const nextCell = matrix.filter(
            cellObj => cellObj.x === x && Math.abs(cellObj.y - y) === i && cellObj.checked === checked
        );
        if (nextCell.length > 0) {
            verticalLine = [...verticalLine, ...nextCell];
            if (verticalLine.length >= 5) {
                winLine = verticalLine;
            }
        } else break;
    }

    for (let i = 1; i <= 5; i++) {
        const nextCell = matrix.filter(
            cellObj => Math.abs(cellObj.x - x) === i && Math.abs(cellObj.y - y) === i && cellObj.checked === checked
        );
        if (nextCell.length > 0) {
            diagonalLine = [...diagonalLine, ...nextCell];
            if (diagonalLine.length >= 5) {
                winLine = diagonalLine;
            }
        } else break;
    }

    if (winLine && winLine.length === 5) {
        winLine = winLine.sort((cellObj, nextCellObj) => cellObj.index - nextCellObj.index);
        return winLine;
    }

    return null;
};
