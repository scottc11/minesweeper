import express from "express";
import MongoDBStore from 'connect-mongodb-session'
import { ServerPort } from "../common/conf";
import { connectDB } from "./database";
import { Game } from "./game/Game";
import gameRouter from "./routes/gameRouter";
import { mongoURI } from "./config/config";
import session from "express-session";

// create express application
const app = express();

// connect database
connectDB();

app.use(session({
    secret: 'some secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))

// setup api routes
app.use('/api/games', gameRouter);

// start server
app.listen(ServerPort, () => {
    console.log(`Minesweeper 🎮 listening on port ${ServerPort} 👌`);
})