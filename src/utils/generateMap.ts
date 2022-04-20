
const parseMapData = (data:string) => {
    return false;
}

const generateMapArray = (rows:number, cols:number): boolean[][] => {
    let board: boolean[][] = new Array(cols)
    for (let x = 0; x < board.length; x++) {
        board[x] = new Array(rows);
        for (let y = 0; y < board[x].length; y++) {
            board[x][y] = true;
        }
    }
    return board;
}

export default generateMapArray;