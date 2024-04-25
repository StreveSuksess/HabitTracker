import { DataToUpload, Habit, HabitAction, UntraceableHabit } from '../../models/habitModels.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getWeekNumber } from '../../utils/utils.ts'
import { Bounce, toast } from 'react-toastify'

const LS_KEY_HABITS = 'habits'

export type TGradient = 'orange' | 'blue' | 'pink' | 'yellow'
export type TColor = 'green' | 'blue' | 'pink' | 'yellow'
export type TAchievement = {
	value: number,
	completed: boolean


const successNotify = (text: string) => toast.success(text, {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light',
	transition: Bounce
})

interface InitialState extends DataToUpload {
	allHabits: Habit[],
	allActions: HabitAction[],
	allUntraceableHabits?: UntraceableHabit[],
	untraceableHabits?: UntraceableHabit[],
	coinsNumber: number,
	level: {
		currentProgress: number,
		levelNumber: number
	},
	activity: {
		lastActiveDate: string,
		currentActiveScore: number
	},
	shop: {
		purchases: {
			gradients: TGradient[],
			colors: TColor[],
		}
		currentGradient: TGradient,
		currentColor: TColor,
	},
	achievements: {
		completedHabits: TAchievement[]
		activeScore: TAchievement[]
		actions: TAchievement[]
	},
	options: {
		selectedTime?: string
	}
}

const initialState: InitialState = JSON.parse(localStorage.getItem(LS_KEY_HABITS) ?? 'null') || {
	allHabits: [],
	allActions: [],
	habits: [],
	actions: [],
	coinsNumber: 0,
	level: {
		currentProgress: 0,
		levelNumber: 1
	},
	activity: {
		lastActiveDate: new Date().toISOString(),
		currentActiveScore: 1
	},
	shop: {
		purchases: {
			gradients: ['orange'],
			colors: ['green']
		},
		currentGradient: 'orange',
		currentColor: 'green'
	},
	achievements: {
		completedHabits: [
			{
				value: 1,
				completed: false
			},
			{
				value: 5,
				completed: false
			},
			{
				value: 10,
				completed: false
			},
			{
				value: 50,
				completed: false
			},
			{
				value: 100,
				completed: false
			},
			{
				value: 300,
				completed: false
			}
		],
		activeScore: [
			{
				value: 1,
				completed: false
			},
			{
				value: 5,
				completed: false
			},
			{
				value: 10,
				completed: false
			},
			{
				value: 50,
				completed: false
			},
			{
				value: 100,
				completed: false
			},
			{
				value: 300,
				completed: false
			}
		],
		actions: [
			{
				value: 1,
				completed: false
			},
			{
				value: 5,
				completed: false
			},
			{
				value: 10,
				completed: false
			},
			{
				value: 50,
				completed: false
			},
			{
				value: 100,
				completed: false
			},
			{
				value: 300,
				completed: false
			}
		]
	},
	options: {}
}

export const HabitSlice = createSlice({
	name: 'habits',
	initialState,
	reducers: {
		addHabit: (state, action: PayloadAction<Omit<Habit, 'id'>>) => {
			if (state.options?.selectedTime) {
				warningNotify('В машине времени нельзя взаимодействовать с привычками!')
				return
			}
			const habit: Habit = {
				id: Date.now(),
				...action.payload
			}
			state.habits.push(habit)
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		removeHabit: (state, action: PayloadAction<number>) => {
			if (state.options?.selectedTime) {
				warningNotify('В машине времени нельзя взаимодействовать с привычками!')
				return
			}
			const habit = state.habits.find((habit: Habit) => habit.id === action.payload)
			if (habit) {
				if (state.untraceableHabits) {
					state.untraceableHabits.push({
						...habit,
						removeDate: (new Date()).toISOString()
					})
				} else {
					state.untraceableHabits = [{
						...habit,
						removeDate: (new Date()).toISOString()
					}]
				}
			}

			state.habits = state.habits.filter(
				(habit: Habit) => habit.id !== action.payload
			)

			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		removeHabitWithHistory: (state, action: PayloadAction<number>) => {
			state.habits = state.habits.filter(
				(habit: Habit) => habit.id !== action.payload
			)
			state.actions = state.actions.filter(
				(habitAction: HabitAction) => habitAction.id !== action.payload
			)

			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		addAction: (state, action: PayloadAction<Omit<HabitAction, 'date'>>) => {
			if (state.options?.selectedTime) {
				warningNotify('В машине времени нельзя взаимодействовать с привычками!')
				return
			}
			const actionHabit: Habit | undefined = state.habits.find((habit: Habit) => habit.id === action.payload.id)
			if (!actionHabit) return
			const habitAction: HabitAction = {
				date: (new Date()).toISOString(),
				id: action.payload.id
			}

			if (actionHabit?.targetValue) {
				habitAction.value = action.payload.value
				if (+(action.payload.value ?? 0) >= +actionHabit.targetValue) {
					state.coinsNumber += 10
				}
			}

			const completedHabitsNumber = state.actions.filter(action => !action?.value).length
			const actionsNumber = state.actions.length
			state.achievements.completedHabits.forEach((achievement, index) => {
				if (!achievement.completed) {
					if (completedHabitsNumber >= achievement.value) {
						state.achievements.completedHabits[index].completed = true
						successNotify(`Вы сделали ${achievement.value} нецелевую привычку!`)
					}
				}
			})
			state.achievements.actions.forEach((achievement, index) => {
				if (!achievement.completed) {
					if (actionsNumber >= achievement.value) {
						state.achievements.actions[index].completed = true
						successNotify(`Вы сделали ${achievement.value} действие с привычками!`)
					}
				}
			})

			state.actions.push(habitAction)
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		removeAction: (state, action: PayloadAction<Omit<HabitAction, 'date'>>) => {
			const actionHabit: Habit | undefined = state.habits.find((habit: Habit) => habit.id === action.payload.id)

			state.actions = state.actions.filter(
				(habitAction: HabitAction) => {
					switch (actionHabit?.period) {
						case 'daily':
							return actionHabit?.targetValue ? habitAction.id !== action.payload.id || (new Date(habitAction.date)).getDate() !== (new Date).getDate() || habitAction.value !== action.payload.value : habitAction.id !== action.payload.id || (new Date(habitAction.date)).getDate() !== (new Date).getDate()
						case 'weekly':
							return actionHabit?.targetValue ? habitAction.id !== action.payload.id || getWeekNumber((new Date(habitAction.date))) !== getWeekNumber(new Date()) || habitAction.value !== action.payload.value : habitAction.id !== action.payload.id || getWeekNumber((new Date(habitAction.date))) !== getWeekNumber(new Date())
						case 'monthly':
							return actionHabit?.targetValue ? habitAction.id !== action.payload.id || (new Date(habitAction.date)).getMonth() !== (new Date()).getMonth() || habitAction.value !== action.payload.value : habitAction.id !== action.payload.id || (new Date(habitAction.date)).getMonth() !== (new Date()).getMonth()
					}
				}
			)

			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		addLevelProgress: (state, action: PayloadAction<number>) => {
			state.level.currentProgress += action.payload

			if (state.level.currentProgress >= 100) {
				state.level.levelNumber += 1
				state.level.currentProgress = 0
				state.coinsNumber += 50
				successNotify('Уровень поднят, коэффициент получения монет увеличился, дополнительно получено 50 монет')
			}

			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		addCoins: (state, action: PayloadAction<number>) => {
			state.coinsNumber += Math.round(action.payload * (1 + state.level.levelNumber / 10))

			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		setLastActiveDate: (state) => {
			const lastActiveDate = new Date(state.activity.lastActiveDate)
			const currentDate = new Date(state.options?.selectedTime ?? new Date().toISOString())

			console.log(lastActiveDate.toDateString(), currentDate.toDateString())
			if (lastActiveDate.toDateString() !== currentDate.toDateString()) {
				console.log('x')
				if (lastActiveDate.getDate() + 1 === currentDate.getDate() && currentDate.getMonth() === lastActiveDate.getMonth() && currentDate.getFullYear() === lastActiveDate.getFullYear()) {
					state.activity.currentActiveScore += 1
				} else {
					state.activity.currentActiveScore = 1
				}
			}

			const activeScore = state.activity.currentActiveScore
			state.achievements.activeScore.forEach((achievement, index) => {
				if (!achievement.completed) {
					if (activeScore >= achievement.value) {
						state.achievements.activeScore[index].completed = true
						successNotify(`Вы зашли ${achievement.value} день подряд!`)
					}
				}
			})

			state.activity.lastActiveDate = currentDate.toISOString()

			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		buyGradient: (state, action: PayloadAction<{ gradient: TGradient, price: number }>) => {
			if (state.coinsNumber - action.payload.price >= 0) {
				state.coinsNumber -= action.payload.price
				state.shop.purchases.gradients.push(action.payload.gradient)
				state.shop.currentGradient = action.payload.gradient
			} else {
				warningNotify('У вас мало чокопай-коинов!')
			}
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		setGradient: (state, action: PayloadAction<TGradient>) => {
			state.shop.currentGradient = action.payload
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		buyColor: (state, action: PayloadAction<{ color: TColor, price: number }>) => {
			if (state.coinsNumber - action.payload.price >= 0) {
				state.coinsNumber -= action.payload.price
				state.shop.purchases.colors.push(action.payload.color)
				state.shop.currentColor = action.payload.color
			} else {
				warningNotify('У вас мало чокопай-коинов!')
			}
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		setColor: (state, action: PayloadAction<TColor>) => {
			state.shop.currentColor = action.payload
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		selectTime: (state, action: PayloadAction<string>) => {
			state.options['selectedTime'] = action.payload
			state.habits = state.allHabits.filter(habit => new Date(habit.addDate) <= new Date(action.payload))
			state.actions = state.allActions.filter(habitAction => new Date(habitAction.date) <= new Date(action.payload))

			const lastActiveDate = new Date(state.activity.lastActiveDate)
			const currentDate = new Date(action.payload)

			if (lastActiveDate.toDateString() !== currentDate.toDateString()) {
				if (lastActiveDate.getDate() + 1 === currentDate.getDate() && currentDate.getMonth() === lastActiveDate.getMonth() && currentDate.getFullYear() === lastActiveDate.getFullYear()) {
					state.activity.currentActiveScore += 1
				} else {
					state.activity.currentActiveScore = 1
				}
			}

			const activeScore = state.activity.currentActiveScore
			state.achievements.activeScore.forEach((achievement, index) => {
				if (!achievement.completed) {
					if (activeScore >= achievement.value) {
						state.achievements.activeScore[index].completed = true
						successNotify(`Вы зашли ${achievement.value} день подряд!`)
					}
				}
			})
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		resetTime: (state) => {
			delete (state.options.selectedTime)
			state.habits = state.allHabits
			state.actions = state.allActions
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		},
		setData: (state, action: PayloadAction<DataToUpload>) => {
			if (!action.payload) return
			const habits = action.payload.habits
			const actions = action.payload.actions
			state.allActions = actions
			state.allHabits = habits

			const currentTime = state.options.selectedTime ? new Date(state.options.selectedTime) : new Date()

			state.actions = actions.filter(action => new Date(action.date) <= currentTime)
			state.habits = habits.filter(habit => new Date(habit.addDate) <= currentTime)

			const completedHabitsNumber = state.actions.filter(action => !action?.value).length
			const actionsNumber = state.actions.length
			state.achievements.completedHabits.forEach((achievement, index) => {
				if (!achievement.completed) {
					if (completedHabitsNumber >= achievement.value) {
						state.achievements.completedHabits[index].completed = true
						successNotify(`Вы сделали ${achievement.value} нецелевую привычку!`)
					}
				}
			})
			state.achievements.actions.forEach((achievement, index) => {
				if (!achievement.completed) {
					if (actionsNumber >= achievement.value) {
						state.achievements.actions[index].completed = true
						successNotify(`Вы сделали ${achievement.value} действие с привычками!`)
					}
				}
			})
			const activeScore = state.activity.currentActiveScore
			state.achievements.activeScore.forEach((achievement, index) => {
				if (!achievement.completed) {
					if (activeScore >= achievement.value) {
						state.achievements.activeScore[index].completed = true
						successNotify(`Вы зашли ${achievement.value} день подряд!`)
					}
				}
			})
			localStorage.setItem(LS_KEY_HABITS, JSON.stringify(state))
		}
	}
})

export const habitsActions = HabitSlice.actions
export const habitsReducer = HabitSlice.reducer
