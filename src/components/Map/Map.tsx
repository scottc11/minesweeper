import { FC } from 'react';
import { Tile } from '../index';

interface MapProps {
    data: boolean[][];
}

const Map: FC<MapProps> = (props) => {
    console.log(props.data);
    return (
        <div className='map'>
            {
                props.data.map(row => {
                    return (
                        <div className='map--row'>
                            {row.map(tile => <Tile blank={tile} />)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Map;