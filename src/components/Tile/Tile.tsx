import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameStatus, setStatus } from '../../redux/mapSlice';
import { webSocket } from '../../redux/sagas';
import { RootState } from '../../redux/store';

interface TileProps {
    value: string;
    x: number;
    y: number;
}

const Tile: FC<TileProps> = (props) => {
    const { status } = useSelector((state: RootState) => state.map);
    const dispatch = useDispatch();

    const renderTile = () => {
        if (props.value === "□" && status !== GameStatus.GAME_OVER) {
            return (
                <div
                    className='tile--unopened'
                    onClick={() => webSocket.send(`open ${props.x} ${props.y}`)}
                    onMouseEnter={() => dispatch(setStatus(GameStatus.NERVOUS))}
                    onMouseLeave={() => dispatch(setStatus(GameStatus.OK))}
                >
                    {props.value}
                </div>
            )
        } else {
            return <div>{props.value}</div>;
        }
    }

    let tileClass = props.value === "□" ? '' : '';
    return (
        <div className='tile'>
            {renderTile()}
        </div>
    )
}

export default Tile;