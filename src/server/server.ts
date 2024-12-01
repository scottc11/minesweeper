import express from "express";
import { connectDB } from "./database";
import gameRouter from "./routes/gameRouter";
import session from "express-session";
import cors from 'cors';
import { Game } from "./game/Game";
import clc from "cli-color";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // load .env file

// create express application
const app = express();

// connect database
// connectDB();

export const GAMES: Array<Game> = [];

app.use(cors({
    origin: `http://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(session({
    secret: 'some secret',
    cookie: {
        secure: false, // set true when using https
        domain: `http://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`,
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

// Serve static files from the ./dist directory
const staticDir = path.join(__dirname, '../../dist');
console.log(staticDir);
app.use(express.static(staticDir));

// Route to serve index.html
app.get('/', (req, res) => {
    console.log('serving');
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// start server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`\nMinesweeper 🎮 listening on port ${process.env.SERVER_PORT} | domain ${process.env.SERVER_DOMAIN} 👌`);
})