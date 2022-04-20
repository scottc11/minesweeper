import { FC } from 'react';
import { webSocket } from '../../redux/sagas';

interface TileProps {
    data: string;
    x: number;
    y: number;
}

const Tile: FC<TileProps> = (props) => {
    let tileClass = props.data === "o" ? 'blank' : '';
    return (
        <div onClick={() => webSocket.send(`open ${props.x} ${props.y}`)} className={`tile ${tileClass}`}>
            {props.data}
        </div>
    )
}

export default Tile;