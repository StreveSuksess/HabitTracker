import { configureStore } from '@reduxjs/toolkit'
import { habitsReducer } from './slices/HabitSlice.ts'

export const store = configureStore({
	reducer: {
		habitsData: habitsReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
