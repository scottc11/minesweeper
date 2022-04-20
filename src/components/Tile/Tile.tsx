import { FC } from 'react';

interface TileProps {
    data: string;
}

const Tile: FC<TileProps> = (props) => {
    let tileClass = props.data == "o" ? 'blank' : '';
    return (
        <div className={`tile ${tileClass}`}>
            {props.data}
        </div>
    )
}

export default Tile;