import { FC } from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { webSocket } from '../../redux/sagas';
import { SentimentNeutralOutlined, SentimentVeryDissatisfiedOutlined } from '@mui/icons-material';
import { GameStatus } from '../../redux/mapSlice';

interface NewGameButtonProps {
    status: GameStatus;
}

const NewGameButton: FC<NewGameButtonProps> = (props) => {

    let icon;
    switch (props.status) {
        case GameStatus.OK:
            icon = <SentimentSatisfiedAltIcon fontSize="large" />;
            break;
        case GameStatus.NERVOUS:
            icon = <SentimentNeutralOutlined fontSize="large" />;
            break;
        case GameStatus.GAME_OVER:
            icon = <SentimentVeryDissatisfiedOutlined fontSize="large" />
            break;
    }

    return (
        <div onClick={() => webSocket.send(`new 1`)}>
            {icon}
        </div>
    )
}

export default NewGameButton;