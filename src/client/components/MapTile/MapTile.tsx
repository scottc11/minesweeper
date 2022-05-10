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
        if (props.value === TileValue.UNREVEALED) {
            return undefined;
        } else if (props.value === "0") {
            return undefined;
        } else if (props.value === TileValue.MINE) {
            return "💣"
        } else {
            return props.value;
        }
    }

    const handleClick = () => {
        if (props.value == TileValue.UNREVEALED && status != GameStatus.GAME_OVER) {
            dispatch(revealTile(position));
        }
    }

    const getClassNames = () => {
        if (props.value !== TileValue.UNREVEALED) {
            return 'tile--opened';
        } else {
            return 'tile--unopened';
        }
    }

    return (
        <div className={`tile ${getClassNames()}`} onClick={handleClick}>
            {renderTile()}
        </div>
    )
}

export default MapTile;