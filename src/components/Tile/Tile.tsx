import { FC } from 'react';

interface TileProps {
    blank: boolean;
}

const Tile: FC<TileProps> = (props) => {
    let tileClass = props.blank ? 'blank' : '';
    return (
        <div className={`tile ${tileClass}`}>
            
        </div>
    )
}

export default Tile;