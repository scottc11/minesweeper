import { FC } from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { SentimentNeutralOutlined, SentimentVeryDissatisfiedOutlined } from '@mui/icons-material';
import { Button, Fade, Tooltip } from '@mui/material';
import { GameStatus } from '../../../common/types'

interface NewGameButtonProps {
    status: GameStatus;
}

const NewGameButton: FC<NewGameButtonProps> = (props) => {

    let icon;
    switch (props.status) {
        case GameStatus.OK:
            icon = <SentimentSatisfiedAltIcon sx={{ fontSize: 60 }} />;
            break;
        case GameStatus.SELECTING:
            icon = <SentimentNeutralOutlined sx={{ fontSize: 60 }} />;
            break;
        case GameStatus.GAME_OVER:
            icon = <SentimentVeryDissatisfiedOutlined sx={{ fontSize: 60 }} />
            break;
    }

    return (
        <Tooltip title="New Game" placement="top" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 1000 }}>
            <div onClick={() => console.log('new game action')}>
                <Button color="primary">
                    <span className='new-game-btn'>{icon}</span>
                </Button>
            </div>
        </Tooltip>
    )
}

export default NewGameButton;