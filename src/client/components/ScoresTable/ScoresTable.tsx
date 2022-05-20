import { FC, useState } from 'react';
import VerticalButton from '../VerticalButton/VerticalButton';
import mockScores from './mockScores';
import './ScoresTable.scss';

const ScoresTable: FC = (props) => {
    const [visible, setVisibility] = useState(false);
    return (
        <div className='scores-table'>
            <div></div>
            <VerticalButton label="SCORES" orientation="right" active={visible} onClick={() => setVisibility(!visible)} />
        </div>
    )
}

export default ScoresTable;