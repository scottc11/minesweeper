import { LOAD_GAME_DATA, NEW_GAME } from ".";
import { GameClientType } from "../../../common/types";

export const newGame = () => ({
    type: NEW_GAME
})

export const loadGameData = (data: GameClientType) => {
    return {
        type: LOAD_GAME_DATA,
        payload: data
    }
}