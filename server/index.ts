import { TileType, TileTypes } from "../common/types";
import express from "express";
import { ServerPort } from "../common/conf";
import { connectDB } from "./database";
import { Game } from "./game/Game";
import gameRouter from "./routes/gameRouter";

console.log("Hellooo Minesweeper ⛏");

export const game: Game = new Game(10, 10, 25);

game.reset();
console.table(game.board);

// create express application
const app = express();

// connect database
connectDB();

// setup api routes
app.use('/api/games', gameRouter);

// start server
app.listen(ServerPort, () => {
    console.log(`Example app listening on port ${ServerPort} 👌`);
})