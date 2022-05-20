import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementGameClock } from '../../redux/actions/gameActions';
import { RootState } from '../../redux/store';
import './GameClock.scss';

function numToClockString(num: number): string {
    if (num < 10) {
        return `0${num}`
    } else {
        return `${num}`;
    }
}

const GameClock: FC = (props) => {
    
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game)

    const secs = game.timeElapsed % 60;
    const mins = Math.floor(game.timeElapsed % (60*60) / 60);
    
    useEffect(() => {
        let intervalID: any;
        if (game.clockIsRunning) {
            intervalID = setInterval(() => dispatch(incrementGameClock()), 1000);
        } else if (!game.clockIsRunning) {
            clearInterval(intervalID);
        }
        return () => { //  If your effect returns a function, React will run it when it is time to clean up. React also cleans up effects from the previous render before running the effects next time.
            clearInterval(intervalID); 
        }
    }, [game.timeElapsed, game.clockIsRunning])

    return (
        <div className='game-clock'>{`${numToClockString(mins)}:${numToClockString(secs)}`}</div>
    )
}

export default GameClock;