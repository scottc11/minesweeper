import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GameStatus } from '../../../common/types';
import { revealTile } from '../../redux/actions/gameActions';
import { createTilePosition } from '../../../common/utils';

interface MapTileProps {
    value: string;
    row: number;
    col: number;
}

const MapTile: FC<MapTileProps> = (props) => {
    const { status } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const position = createTilePosition(props.row, props.col);

    const renderTile = () => {
        if (props.value === "□" && status !== GameStatus.GAME_OVER) {
            return (
                <div
                    className='tile--unopened'
                    onClick={() => dispatch(revealTile(position)) }
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