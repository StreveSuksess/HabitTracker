import { Dispatch, FC } from 'react'
import s from './StatisticsDay.module.scss'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { HabitWithRemoveDate } from '../../../models/habitModels.ts'
import { getMonthName } from '../../../utils/utils.ts'

type Props = {
	date: string,
	active: boolean,
	selectFunction: Dispatch<any>,
}

export const StatisticsDay: FC<Props> = (props) => {
	const actions = useAppSelector(state => state.habitsData.actions)
	const habits = useAppSelector(state => state.habitsData?.untraceableHabits ? [...state.habitsData.habits, ...state.habitsData.untraceableHabits] : state.habitsData.habits).filter((habit: HabitWithRemoveDate) => new Date(props.date) >= new Date(habit.addDate) && habit.period === 'daily' && (habit?.removeDate ? new Date(props.date) < new Date(habit.removeDate) : true))
	let score = 0
	habits.filter(habit => habit.addDate <= props.date).forEach(habit => {
		if (habit?.targetValue) {
			const allDayActions = actions.filter(action => action.id === habit.id && new Date(action.date).toDateString() === new Date(props.date).toDateString()).sort((a, b) => +(new Date(b.date)) - +(new Date(a.date)))
			score += +(allDayActions[0]?.value ?? 0) >= +habit.targetValue ? 1 : 0
		} else {
			score += actions.find(action => action.id === habit.id && new Date(action.date).toDateString() === new Date(props.date).toDateString()) ? 1 : 0
		}
	})
	const completed = score === 0 || habits.length === 0 ? 0 : score / habits.length

	return (
		<button onClick={() => {
			props.selectFunction(props.date)
		}} className={props.active ? `${s.main} ${s.active}` : s.main}>
			<CircularProgressbarWithChildren styles={buildStyles({
				pathColor: `#37C871`,
				trailColor: 'rgb(251, 251, 251)',
				strokeLinecap: `16px`
			})} value={completed} maxValue={1}>
				<div className={s.text}>
					<span
						className={props.active ? `orange-gradient-text ${s.dayNumber}` : s.dayNumber}>{new Date(props.date).getDate()}</span>
					<span
						className={props.active ? `orange-gradient-text ${s.monthNumber}` : s.monthNumber}>{getMonthName(new Date(props.date).getMonth())}</span>
				</div>
			</ CircularProgressbarWithChildren>
		</button>
	)
}
