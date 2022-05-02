export interface TilePosition {
    row: number;
    col: number;
}

export enum TileValue {
    MINE = "*",
    UNREVEALED = "□"
}

export type MapData = Array<Array<string>>;

export enum GameStatus {
    OK,
    SELECTING,
    GAME_OVER,
    YOU_WIN
}

export interface GameClientType {
    map: MapData,
    status: GameStatus
}