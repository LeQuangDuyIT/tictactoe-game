import './Cell.css';

const Cell = props => {
    const { index, checked, edgeLength, handleCheckedCell } = props;
    const cellStyle = {
        width: `${100 / edgeLength}%`,
        heigth: `${100 / edgeLength}%`
    };

    const onCheckedCell = () => {
        if (!checked) {
            handleCheckedCell(index);
        }
    };

    return (

        <div className="cell__wrap" style={cellStyle}>
            <div className="cell__core" onClick={onCheckedCell}>
                {checked === 'X' && <img src="/assets/x-player.png" alt="X" />}
                {checked === 'O' && <img src="/assets/o-player.png" alt="O" />}
            </div>
        </div>
    );
};

export default Cell;
