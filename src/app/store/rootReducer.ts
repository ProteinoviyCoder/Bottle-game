import { combineReducers } from "redux";
import playersReducer from "../../entities/player/model/playersSliceStore";
import gameScriptReducer from "../../shared/model/gameScriptSlice";
import gameCountsReducer from "../../features/gameCounts/model/gameCountsSlice";

export const rootReducer = combineReducers({
  players: playersReducer,
  gameScript: gameScriptReducer,
  gameCounts: gameCountsReducer,
});
