import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  countKiss: number;
  countHandshake: number;
  countReject: number;
};

const initialState: InitialState = {
  countKiss: 0,
  countHandshake: 0,
  countReject: 0,
};

const gameCountsSlice = createSlice({
  name: "gameCounts",
  initialState,
  reducers: {
    incrementCountKiss(state) {
      state.countKiss = state.countKiss + 1;
    },
    incrementCountHandshake(state) {
      state.countHandshake = state.countHandshake + 1;
    },
    incrementCountReject(state) {
      state.countReject = state.countReject + 1;
    },
  },
});

export const {
  incrementCountKiss: actionIncrementCountKiss,
  incrementCountHandshake: actionIncrementCountHandshake,
  incrementCountReject: actionIncrementCountReject,
} = gameCountsSlice.actions;

export default gameCountsSlice.reducer;
