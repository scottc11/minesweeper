import express from 'express';
import { nextTick } from 'process';
import { Game } from '../game/Game';
declare module 'express-session' {
    export interface SessionData {
        game: Game;
    }
}

const gameRouter = express.Router();

// invoked for any requests passed to this router. Apply middleware here
gameRouter.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path)
    next();
})

gameRouter.get('/', (req, res, next) => {
    next();
})

gameRouter.get('/map', (req, res) => {
    if (req.session.game) {
        res.json(req.session.game.board);
    } else {
        res.status(404).json('first create a new game');
    }
})

gameRouter.post('/new', (req, res, next) => {
    if (!req.session.game) {
        req.session.game = new Game(10, 10, 25);
        req.session.game.reset();
        next();
    }
})

gameRouter.post('/reveal/:row-:col', (req, res) => {
    const { row, col } = req.params;
    res.json(`row: ${row} column: ${col}`);
})

gameRouter.use((req, res, next) => {
    if (req.session.game) {
        res.json(req.session.game.getClientAttributes());
    } else {
        res.status(404).json('Must create a new game first.');
    }
})

export default gameRouter;