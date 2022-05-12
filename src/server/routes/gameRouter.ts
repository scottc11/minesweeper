import express from 'express';
import { nextTick } from 'process';
import { TilePosition } from '../../common/types';
import { Game } from '../game/Game';
import { GAMES } from '../server';
declare module 'express-session' {
    export interface SessionData {
        game: Game;
    }
}

let GAME: Game;

const gameRouter = express.Router();

// invoked for any requests passed to this router. Apply middleware here
gameRouter.use((req, res, next) => {
    // console.log('%s %s %s', req.method, req.url, req.path)
    next();
})

gameRouter.get('/', (req, res, next) => {
    next();
})

gameRouter.post('/new', (req, res, next) => {
    // if (!GAMES.map(game=>game.id).includes(req.session.id)) {
    //     GAMES.push(new Game(10, 10, 25, req.session.id));
    // }
    GAME = new Game(10, 10, 25, req.session.id);
    GAME.reset();
    next();
})

gameRouter.post('/reveal/:row-:col', (req, res, next) => {
    const { row, col } = req.params;
    const tile: TilePosition = { row: Number(row), col: Number(col) };
    GAME.reveal(tile);
    next();
})

gameRouter.post('/flag/:row-:col', (req, res, next) => {
    const { row, col } = req.params;
    const tile: TilePosition = { row: Number(row), col: Number(col) };
    GAME.flag(tile);
    next();
})

gameRouter.post('/removeflag/:row-:col', (req, res, next) => {
    const { row, col } = req.params;
    const tile: TilePosition = { row: Number(row), col: Number(col) };
    GAME.removeFlag(tile);
    next();
})

gameRouter.use((req, res, next) => {
    res.json(GAME.getClientAttributes());
})

export default gameRouter;