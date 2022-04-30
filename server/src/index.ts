


/*
'M' represents an unrevealed mine,
'E' represents an unrevealed empty square,
'B' represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
'X' represents a revealed mine.
*/

console.log("Hellooo Minesweeper ⛏");



type TilePosition = [number, number];

enum TileTypes {
    MINE = "*",
    UNREVEALED = "□"
}

type BoardType = Array<Array<TileTypes>>;

class Game {
    rows: number;
    columns: number;
    numMines: number;
    board: BoardType;

    constructor(rows: number, columns: number, numMines: number) {
        this.rows = rows;
        this.columns = columns;
        this.numMines = numMines;
        this.board = new Array();
    }

    initialize() {
        // init board empty
        for (let row = 0; row < this.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.columns; col++) {
                this.board[row][col] = TileTypes.UNREVEALED;
            }
        }
        this.placeMines();
    }

    randomlyPlaceMine(): TilePosition {
        
        let random = Math.random() * ((this.rows * this.columns) - 1);
        random = Math.round(random);
        let x: number = Math.floor(random / this.rows);
        let y: number = Math.floor(random % this.columns);
        return [x, y];
    }

    placeMines() {
        let mines: Array<TilePosition> = new Array(this.numMines);
        for (let i = 0; i < mines.length; i++) {
            mines[i] = this.randomlyPlaceMine();
            this.board[mines[i][0]][mines[i][1]] = TileTypes.MINE;
        }
    }
}

const game: Game = new Game(10, 10, 25);

game.initialize();
console.table(game.board);