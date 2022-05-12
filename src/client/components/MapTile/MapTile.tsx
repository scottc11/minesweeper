import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { RootState } from '../../redux/store';
import { GameStatus, TileValue } from '../../../common/types';
import { flagTile, removeFlag, revealTile, setGameButtonStatus } from '../../redux/actions/gameActions';
import { createTilePosition } from '../../../common/utils';
import './MapTile.scss';

interface MapTileProps {
    value: string;
    row: number;
    col: number;
}

enum MouseButton {
    LEFT_CLICK = 0,
    RIGHT_CLICK = 2
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
            return "💣";
        } else if (props.value === TileValue.FLAGGED) {
            return "⚐";
        }
        else {
            return props.value;
        }
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        if (event.button === MouseButton.LEFT_CLICK) {
            if (props.value === TileValue.UNREVEALED && status !== GameStatus.GAME_OVER) {
                disableClick(false);
                setThinking(true);
            }
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

    const handleMouseLeave = (event: React.MouseEvent) => {
        disableClick(true)
        setThinking(false);
    }

    const handleRightClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        if (props.value === TileValue.UNREVEALED) {
            dispatch(flagTile(position))
        } else if (props.value === TileValue.FLAGGED) {
            dispatch(removeFlag(position));
        }
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
        if (props.value === TileValue.UNREVEALED) {
            return 'tile--unopened';
        } else if (props.value === TileValue.FLAGGED) {
            return 'tile--unopened tile--flagged';
        }
        else {
            return 'tile--opened';
        }
    }

    return (
        <div
            className={`tile ${getClassNames()} ${isThinking ? 'tile--opened' : ''}`}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleRightClick}
        >
            {renderTile()}
        </div>
    )
}

export default MapTile;