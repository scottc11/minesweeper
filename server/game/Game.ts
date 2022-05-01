import { BoardType, GameClientType, TileType, TileTypes } from "../../common/types";

export class Game {
    started: boolean;
    rows: number;
    columns: number;
    numMines: number;
    board: BoardType;           // state of the board
    boardMask: BoardType;       // what the user sees (ie. state)
    mines: Array<TileType>;     // stores (x,y) coordinates of all mines.

    constructor(rows: number, columns: number, numMines: number) {
        this.started = false;
        this.rows = rows;
        this.columns = columns;
        this.numMines = numMines;
        this.board = new Array();
        this.boardMask = new Array();
        this.mines = new Array(this.numMines);
    }

    reset() {
        // init board empty
        for (let row = 0; row < this.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.columns; col++) {
                this.board[row][col] = TileTypes.UNREVEALED;
            }
        }
        this.placeMines();
    }

    randomlyPlaceMine(): TileType {

        let random = Math.random() * ((this.rows * this.columns) - 1);
        random = Math.round(random);
        let x: number = Math.floor(random / this.rows);
        let y: number = Math.floor(random % this.columns);
        return { row: x, col: y };
    }

    placeMines() {
        for (let i = 0; i < this.mines.length; i++) {
            this.mines[i] = this.randomlyPlaceMine();
            this.board[this.mines[i].row][this.mines[i].col] = TileTypes.MINE;
        }
    }

    // count all the mines surrounding the given tile position
    countNeighboringMines(tile: TileType): number {
        /*
            N.W  N   N.E
              \  |  /
            W-- Cell -- E
              /  |  \
            S.W  S   S.E
        */
        const positions = [
            [-1, 0], // North
            [-1, 1], // N.E
            [0, 1],  // East
            [1, 1],  // S.E
            [1, 0],  // South
            [1, -1], // S.W
            [0, -1], // West
            [-1, -1] // N.W
        ];

        let counter: number = 0;
        for (let i = 0; i < positions.length; i++) {
            let ghostTile = { row: tile.row + positions[i][0], col: tile.col + positions[i][1] };
            if (this.tileExists(ghostTile)) {
                if (this.tileIsMine(ghostTile)) {
                    counter++;
                }
            }
        }
        return counter;
    }

    tileExists(tile: TileType): boolean {
        return (tile.row >= 0) && (tile.row < this.rows) && (tile.col >= 0) && (tile.col < this.columns);
    }

    // check if given tile is a mine
    tileIsMine(tile: TileType): boolean {
        return this.board[tile.row][tile.col] === TileTypes.MINE ? true : false;
    }

    getClientAttributes(): GameClientType {
        return { map: this.board }
    }
}