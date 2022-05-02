import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GameStatus } from '../../common/types'

interface MapTileProps {
    value: string;
    x: number;
    y: number;
}

const MapTile: FC<MapTileProps> = (props) => {
    const { status } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    const renderTile = () => {
        if (props.value === "□" && status !== GameStatus.GAME_OVER) {
            return (
                <div
                    className='tile--unopened'
                    onClick={() => console.log(`open ${props.x} ${props.y}`)}
                    // onMouseEnter={() => dispatch(setStatus(GameStatus.SELECTING))}
                    // onMouseLeave={() => dispatch(setStatus(GameStatus.OK))}
                >
                    {props.value}
                </div>
            )
        } else {
            return <div>{props.value}</div>;
        }
    }

    return (
        <div className='tile'>
            {renderTile()}
        </div>
    )
}

export default MapTile;