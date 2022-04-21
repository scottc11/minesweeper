import { FC } from 'react';
import { Tile } from '../index';

interface MapProps {
    data: string[][];
}

const Map: FC<MapProps> = (props) => {
    return (
        <div className='map'>
            {
                props.data.map((row, y) => {
                    return (
                        <div key={y} className='map--row'>
                            {row.map((value, x) => {
                                return <Tile key={x} x={x} y={y} value={value} />;
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Map;