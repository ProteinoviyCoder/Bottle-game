import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  gameScript: "kiss" | "handshake" | "reject" | null;
};

const initialState: InitialState = {
  gameScript: "handshake",
};

const gameScriptSlice = createSlice({
  name: "gameScript",
  initialState,
  reducers: {
    setGameScript(
      state,
      action: PayloadAction<"kiss" | "handshake" | "reject">
    ) {
      state.gameScript = action.payload;
    },
    resetGameScript(state) {
      state.gameScript = null;
    },
  },
});

export const {
  setGameScript: actionSetGameScript,
  resetGameScript: actionResetGameScript,
} = gameScriptSlice.actions;

export default gameScriptSlice.reducer;
