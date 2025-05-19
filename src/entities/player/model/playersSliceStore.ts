import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Player } from "./types";

type PlayersState = {
  currentPlayer: number;
  selectedPlayer: number | null;
  allPlayers: Player[];
};

const initialState: PlayersState = {
  currentPlayer: 1,
  selectedPlayer: null,
  allPlayers: [
    {
      id: 1,
      img: "./images/face1.png",
      name: "Вы",
      role: "user",
    },
    {
      id: 2,
      img: "./images/face2.png",
      name: "Karl",
      role: "bot",
    },
    {
      id: 3,
      img: "./images/face3.png",
      name: "Kristi",
      role: "bot",
    },
    {
      id: 4,
      img: "./images/face4.png",
      name: "Marta",
      role: "bot",
    },
    {
      id: 5,
      img: "./images/face5.png",
      name: "Ayza",
      role: "bot",
    },
    {
      id: 6,
      img: "./images/face6.png",
      name: "Natali",
      role: "bot",
    },
    {
      id: 7,
      img: "./images/face7.png",
      name: "Eva",
      role: "bot",
    },
    {
      id: 8,
      img: "./images/face8.png",
      name: "Irina",
      role: "bot",
    },
    {
      id: 9,
      img: "./images/face9.png",
      name: "Nastya",
      role: "bot",
    },
    {
      id: 10,
      img: "./images/face10.png",
      name: "Kristina",
      role: "bot",
    },
  ],
};

const players = createSlice({
  name: "players",
  initialState,
  reducers: {
    changeCurrentPlayer: (state, action: PayloadAction<number>) => {
      state.currentPlayer = action.payload;
    },
    changeSelectedPlayer: (state, action: PayloadAction<number>) => {
      state.selectedPlayer = action.payload;
    },
    resetSelectedPlayer: (state) => {
      state.selectedPlayer = null;
    },
  },
});

export const {
  changeCurrentPlayer: actionChangeCurrentPlayer,
  changeSelectedPlayer: actionChangeSelectedPlayer,
  resetSelectedPlayer: actionResetSelectedPlayer,
} = players.actions;

export default players.reducer;
