import { MapData, GameClientType, TilePosition, TileValue, GameStatus } from "../../common/types";

export class Game {
    static numInstances: number = 0;
    id: string;
    status: GameStatus;
    rows: number;
    columns: number;
    numMines: number;
    board: MapData;           // state of the board
    boardMask: MapData;       // what the user sees (ie. state)
    mines: Array<TilePosition>;     // stores (x,y) coordinates of all mines.

    constructor(rows: number, columns: number, numMines: number, id: string) {
        this.status = GameStatus.OK;
        this.rows = rows;
        this.columns = columns;
        this.numMines = numMines;
        this.board = new Array();
        this.boardMask = new Array();
        this.mines = new Array(this.numMines);
        this.id = id;
        Game.numInstances++;
    }

    reset() {
        // init board empty
        for (let row = 0; row < this.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.columns; col++) {
                this.board[row][col] = TileValue.UNREVEALED;
            }
        }
        this.placeMines();
    }

    randomlyPlaceMine(): TilePosition {

        let random = Math.random() * ((this.rows * this.columns) - 1);
        random = Math.round(random);
        let x: number = Math.floor(random / this.rows);
        let y: number = Math.floor(random % this.columns);
        return { row: x, col: y };
    }

    placeMines() {
        for (let i = 0; i < this.mines.length; i++) {
            this.mines[i] = this.randomlyPlaceMine();
            this.board[this.mines[i].row][this.mines[i].col] = TileValue.MINE;
        }
    }

    reveal(tile: TilePosition) {
        if (this.tileIsMine(tile)) {
            // reveal all mines on map
            // set game status to "LOSE"
            console.log('is mine')
        } else {
            // check if tile is blank (ie. no neighboring mines), if it is, then recursively reveal stuff
            const neighboringMines = this.countNeighboringMines(tile);
            this.updateMap(tile, neighboringMines);
        }
    }

    updateMap(tile: TilePosition, value: TileValue | number ) {
        this.board[tile.row][tile.col] = String(value);
        console.table(this.board);
    }

    // count all the mines surrounding the given tile position
    countNeighboringMines(tile: TilePosition): number {
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

    tileExists(tile: TilePosition): boolean {
        return (tile.row >= 0) && (tile.row < this.rows) && (tile.col >= 0) && (tile.col < this.columns);
    }

    // check if given tile is a mine
    tileIsMine(tile: TilePosition): boolean {
        return this.board[tile.row][tile.col] === TileValue.MINE ? true : false;
    }

    getClientAttributes(): GameClientType {
        return { map: this.board, status: this.status }
    }
}