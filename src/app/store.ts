import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../store/gameSlice'
import navReducer from '../store/navigation'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    navigation: navReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch