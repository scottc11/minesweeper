import express from "express";
import { ServerPort } from "../common/conf";
import { connectDB } from "./database";
import gameRouter from "./routes/gameRouter";
import session from "express-session";

// create express application
const app = express();

// connect database
connectDB();

app.use(session({
    secret: 'some secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    saveUninitialized: true,
    resave: false
}))

// setup api routes
app.use('/api/games', gameRouter);

// start server
app.listen(ServerPort, () => {
    console.log(`\nMinesweeper 🎮 listening on port ${ServerPort} 👌`);
})