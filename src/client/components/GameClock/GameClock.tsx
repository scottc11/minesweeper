import { FC, useEffect, useState } from 'react';

function numToClockString(num: number): string {
    if (num < 10) {
        return `0${num}`
    } else {
        return `${num}`;
    }
}

const GameClock: FC = (props) => {

    const [clock, updateClock] = useState(0);
    const secs = clock % 60;
    const mins = Math.floor(clock % (60*60) / 60);
    
    useEffect(() => {
        const intervalID = setInterval(() => updateClock(clock + 1), 1000);
        return () => {
            //  If your effect returns a function, React will run it when it is time to clean up.
            // React also cleans up effects from the previous render before running the effects next time.
            clearInterval(intervalID);
        }
    }, [clock])

    return (
        <div className='game-clock'>{`${numToClockString(mins)}:${numToClockString(secs)}`}</div>
    )
}

export default GameClock;