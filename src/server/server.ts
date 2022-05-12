import express from "express";
import { ServerPort } from "../common/conf";
import { connectDB } from "./database";
import gameRouter from "./routes/gameRouter";
import session from "express-session";
import cors from 'cors';
import { Game } from "./game/Game";
import clc from "cli-color";

// create express application
const app = express();

// connect database
connectDB();

export const GAMES: Array<Game> = [];

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(session({
    secret: 'some secret',
    cookie: {
        secure: false, // set true when using https
        domain: 'http://localhost:3000',
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    saveUninitialized: true,
    resave: false
}))

app.use((req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${clc.blueBright(timestamp)} ${req.method} ${req.url} ${req.path}`)
    console.log(req.headers.cookie);
    console.log(req.session.id);
    console.log(req.sessionID);
    next();
})

// setup api routes
app.use('/api/games', gameRouter);

// start server
app.listen(ServerPort, () => {
    console.log(`\nMinesweeper 🎮 listening on port ${ServerPort} 👌`);
})