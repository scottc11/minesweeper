import { Button, Slide } from "@mui/material";
import { FC, useState } from "react";
import './GameRules.scss';
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import VerticalButton from "../VerticalButton/VerticalButton";

const GameRules: FC = (props) => {
    const [visible, setVisibility] = useState(false);
    return (
        <div className={`game-rules game-rules--visible`}>
            <Slide direction="right" in={visible} mountOnEnter unmountOnExit>
                <div className="game-rules--text">
                    <p><span className="accent--yellow">MINESWEEPER</span> is a game where mines are hidden in a grid of squares.</p>
                    <p>Safe squares have numbers telling you how many mines touch the square.</p>
                    <p>You can use the number clues to solve the game by opening all of the safe squares.</p>
                    <p>If you click on a mine you <span className="accent--red">LOSE THE GAME!</span></p>
                    <p>There are three difficulty levels:</p>
                    <ul>
                        <li><span className="accent--yellow">Beginner</span> (8x8 or 9x9 with 10 mines)</li>
                        <li><span className="accent--orange">Intermediate</span> (16x16 with 40 mines)</li>
                        <li><span className="accent--blue">Expert</span> (30x16 with 99 mines)</li>
                    </ul>
                    <p>The game ends when all safe squares have been opened.</p>
                    <p>
                        A counter shows the number of mines without flags, and a clock shows your time in seconds.
                        Minesweeper saves your best time for each difficulty level.
                    </p>
                    <p>
                        You open squares with the <span className="accent--yellow">left mouse</span> button and put flags on mines with the right mouse button.
                        Pressing the right mouse button again changes your flag into a questionmark.
                    </p>
                </div>
            </Slide>
            <div className="game-rules--toggle">
                <VerticalButton label="RULES" orientation="left" active={visible} onClick={() => setVisibility(!visible)} />
            </div>
        </div>
    )
}

export default GameRules;