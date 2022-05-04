import { FC } from 'react';
import MapTile from '../MapTile/MapTile';

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
                                return <MapTile key={x} row={y} col={x} value={value} />;
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Map;