export interface TilePosition {
    row: number;
    col: number;
}

export enum TileValue {
    MINE = "*",
    UNREVEALED = "□"
}

export type BoardType = Array<Array<string>>;

export interface GameClientType {
    map: BoardType
}