import { Button } from "@mui/material";
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { FC, useState } from "react";
import './GameRules.scss';

const GameRules: FC = (props) => {
    const [visible, setVisibility] = useState(false);
    return (
        <div className={`game-rules game-rules--visible`}>
            <div className="game-rules--toggle">
                <Button onClick={() => setVisibility(!visible)}>
                    <span>RULES</span>
                    {visible ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon /> }
                </Button>
            </div>
            { visible &&
                <div>
                    <p>Minesweeper is a game where mines are hidden in a grid of squares.</p>
                    <p>Safe squares have numbers telling you how many mines touch the square.</p>
                    <p>You can use the number clues to solve the game by opening all of the safe squares.</p>
                    <p>If you click on a mine you lose the game!</p>
                    <br></br>
                    <p>There are three difficulty levels:</p>
                    <ul>
                        <li>Beginner (8x8 or 9x9 with 10 mines)</li>
                        <li>Intermediate (16x16 with 40 mines)</li>
                        <li>Expert (30x16 with 99 mines)</li>
                    </ul>
                    <p>The game ends when all safe squares have been opened.</p>
                    <p>
                        A counter shows the number of mines without flags, and a clock shows your time in seconds.
                        Minesweeper saves your best time for each difficulty level.
                    </p>
                    <p>
                        You open squares with the left mouse button and put flags on mines with the right mouse button.
                        Pressing the right mouse button again changes your flag into a questionmark.
                    </p>
                </div>
            }
        </div>
    )
}

export default GameRules;