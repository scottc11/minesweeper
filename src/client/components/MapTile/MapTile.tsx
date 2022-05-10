import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GameStatus, TileValue } from '../../../common/types';
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
        if (props.value === TileValue.UNREVEALED && status !== GameStatus.GAME_OVER) {
            return (
                <div
                    className='tile--content tile--unopened'
                    onClick={() => dispatch(revealTile(position)) }
                    // onMouseEnter={() => dispatch(setStatus(GameStatus.SELECTING))}
                    // onMouseLeave={() => dispatch(setStatus(GameStatus.OK))}
                >
                </div>
            )
        } else if (props.value === "0") {
            return <div className='tile--content'>{props.value}</div>;
        } else if (props.value === TileValue.MINE) {
            return <div>{"💣"}</div>
        } else {
            return <div className='tile--content'>{props.value}</div>;
        }
    }

    const getClassNames = () => {
        if (props.value !== TileValue.UNREVEALED) {
            return 'tile--opened';
        } else {
            return '';
        }
    }

    return (
        <div className={`tile ${getClassNames()}`}>
            {renderTile()}
        </div>
    )
}

export default MapTile;