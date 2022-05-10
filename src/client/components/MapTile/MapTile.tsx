import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GameStatus, TileValue } from '../../../common/types';
import { revealTile, setGameButtonStatus } from '../../redux/actions/gameActions';
import { createTilePosition } from '../../../common/utils';

interface MapTileProps {
    value: string;
    row: number;
    col: number;
}

const MapTile: FC<MapTileProps> = (props) => {
    const [clickDisabled, disableClick] = useState(true);
    const [isThinking, setThinking] = useState(false);
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

    const handleMouseDown = () => {
        if (props.value === TileValue.UNREVEALED && status !== GameStatus.GAME_OVER) {
            disableClick(false);
            setThinking(true);
        }
    }

    const handleMouseUp = () => {
        // check if mouse is still hovering over element
        if (!clickDisabled) {
            if (props.value === TileValue.UNREVEALED && status !== GameStatus.GAME_OVER) {
                dispatch(revealTile(position));
            }   
        }
        // note: techinically should call setThinking(false), but this causes a re-render which gives an odd flicker
    }

    const handleMouseEnter = () => {
        // disableClick(false)
    }

    const handleMouseLeave = () => {
        disableClick(true)
        setThinking(false);
    }

    useEffect(() => {
        if (isThinking) {
            dispatch(setGameButtonStatus(GameStatus.SELECTING));
        } else {
            if (status !== GameStatus.GAME_OVER) {
                dispatch(setGameButtonStatus(GameStatus.OK));
            }
        }
    }, [isThinking])

    const getClassNames = () => {
        if (props.value !== TileValue.UNREVEALED) {
            return 'tile--opened';
        } else {
            return 'tile--unopened';
        }
    }

    return (
        <div
            className={`tile ${getClassNames()} ${isThinking ? 'tile--opened' : ''}`}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {renderTile()}
        </div>
    )
}

export default MapTile;