import { createSlice } from '@reduxjs/toolkit'

interface GameState {
  hunger: number
  sleep: number
  age: number
}

const initialState: GameState = {
  hunger: 0,
  sleep: 0,
  age: 0,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementStats: (state) => {
      state.hunger += 1
      state.sleep += 1
      state.age += 1
    },
    feedPet: (state) => {
      state.hunger = Math.max(0, state.hunger - 10)
    },
    restPet: (state) => {
      state.sleep = Math.max(0, state.sleep - 10)
    },
  },
})

export const { incrementStats, feedPet, restPet } = gameSlice.actions
export default gameSlice.reducer