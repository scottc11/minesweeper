import express from 'express';
import { nextTick } from 'process';
import { TilePosition } from '../../common/types';
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

gameRouter.post('/new', (req, res, next) => {
    if (!req.session.game) {
        req.session.game = new Game(10, 10, 25);
        req.session.game.reset();
    }
    next();
})

gameRouter.post('/reveal/:row-:col', (req, res, next) => {
    const { row, col } = req.params;
    const tile: TilePosition = { row: Number(row), col: Number(col) };
    if (req.session.game) {
        req.session.game.reveal(tile);
    }
    next();
})

gameRouter.use((req, res, next) => {
    if (req.session.game) {
        res.json(req.session.game.getClientAttributes());
    } else {
        res.status(404).json('Must create a new game first.');
    }
})

export default gameRouter;