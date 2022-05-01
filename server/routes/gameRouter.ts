import express from 'express';
import { game } from '..';

const gameRouter = express.Router();

// invoked for any requests passed to this router
gameRouter.use((req, res, next) => {
    // .. some logic here .. like any other middleware
    next()
})

gameRouter.get('/', (req, res) => {
    res.send('Hello World!!!')
})

gameRouter.get('/map', (req, res) => {
    res.json(game.board);
})

gameRouter.get('/open/:row-:col', (req, res) => {
    const { row, col } = req.params;
    res.json(`row: ${row} column: ${col}`);
})

export default gameRouter;