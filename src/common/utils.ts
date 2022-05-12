import { TilePosition } from "./types";

// common funciton for creating a tile position object
export function createTilePosition(col: number, row: number): TilePosition {
    return {col, row};
}