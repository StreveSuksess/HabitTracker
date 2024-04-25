import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { habitsActions } from '../store/slices/HabitSlice.ts'

const actions = {
	...habitsActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
