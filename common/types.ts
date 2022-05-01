export interface TileType {
    row: number;
    col: number;
}

export enum TileTypes {
    MINE = "*",
    UNREVEALED = "□"
}

export type BoardType = Array<Array<TileTypes>>;

export interface GameClientType {
    map: BoardType
}