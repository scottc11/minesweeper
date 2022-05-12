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
        this.createMineLocations();
    }

    randomlyPlaceMine(): TilePosition {
        let random = Math.random() * ((this.rows * this.columns) - 1);
        random = Math.round(random);
        let x: number = Math.floor(random / this.rows);
        let y: number = Math.floor(random % this.columns);
        return { row: x, col: y };
    }

    createMineLocations() {
        for (let index = 0; index < this.mines.length; index++) {
            this.mines[index] = this.randomlyPlaceMine();
        }
    }

    // reveal all mines on map
    revealMines() {
        this.mines.forEach( mine => this.board[mine.row][mine.col] = TileValue.MINE);
    }

    reveal(tile: TilePosition) {
        if (this.tileIsMine(tile)) {
            this.revealMines();
            this.status = GameStatus.GAME_OVER;
        } else {
            this.countNeighboringMines(tile);
        }
    }

    flag(tile: TilePosition) {
        this.updateMap(tile, TileValue.FLAGGED);
    }

    removeFlag(tile: TilePosition) {
        this.updateMap(tile, TileValue.UNREVEALED);
    }

    updateMap(tile: TilePosition, value: TileValue | number ) {
        this.board[tile.row][tile.col] = String(value);
    }

    // count all the mines surrounding the given tile position
    countNeighboringMines(tile: TilePosition) {
        if (this.tileIsMine(tile) || !this.tileExists(tile) || !this.tileHidden(tile)) {
            return;
        }
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

        // create an array containing all the tile positions adjecent to target tile
        const neighboringTiles: Array<TilePosition> = positions.map( pos => ({ row: tile.row + pos[0], col: tile.col + pos[1] })).filter( t => this.tileExists(t));

        let neighboringMines: number = 0;
        neighboringTiles.forEach( t => { // count the amount of neighboring mines
            if (this.tileIsMine(t)) {
                neighboringMines++;
            }
        })

        if (neighboringMines === 0) { // tile is blank (ie. no neighboring mines), recursively reveal other cells
            this.updateMap(tile, 0);
            neighboringTiles.forEach( t => {
                this.countNeighboringMines(t);
            })
        } else {
            this.updateMap(tile, neighboringMines);
        }
    }

    tileHidden(tile: TilePosition): boolean {
        return this.board[tile.row][tile.col] == TileValue.UNREVEALED;
    }

    tileExists(tile: TilePosition): boolean {
        return (tile.row >= 0) && (tile.row < this.rows) && (tile.col >= 0) && (tile.col < this.columns);
    }

    // check if given tile is a mine
    tileIsMine(tile: TilePosition): boolean {
        return this.mines.findIndex(t => t.row == tile.row && t.col == tile.col) != -1;
    }

    getClientAttributes(): GameClientType {
        return { map: this.board, status: this.status }
    }
}