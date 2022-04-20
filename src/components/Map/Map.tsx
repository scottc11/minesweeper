import { FC } from 'react';
import { Tile } from '../index';

interface MapProps {
    data: string[][];
}

const Map: FC<MapProps> = (props) => {
    return (
        <div className='map'>
            {
                props.data.map((row, x) => {
                    return (
                        <div key={x} className='map--row'>
                            {row.map((data, y) => {
                                return <Tile key={y} data={data} />;
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Map;