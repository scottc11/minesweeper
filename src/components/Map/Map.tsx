import { FC } from 'react';
import { Tile } from '../index';

interface MapProps {
    data: boolean[][];
}

const Map: FC<MapProps> = (props) => {
    return (
        <div className='map'>
            {
                props.data.map((row, x) => {
                    return (
                        <div key={x} className='map--row'>
                            {row.map((tile, y) => {
                                return <Tile key={y} blank={tile} />;
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Map;