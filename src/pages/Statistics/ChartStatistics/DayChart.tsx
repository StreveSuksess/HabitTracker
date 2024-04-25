import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { FC, useState } from 'react'
import { HabitWithRemoveDate } from '../../../models/habitModels.ts'
import { getEndOfNextMonth, getEndOfPreviousMonth, getIsoDates, getMonthName } from '../../../utils/utils.ts'
import s from './ChartStatistics.module.scss'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { chartDataItem } from '../../../models/chartModel.ts'

type Props = {
	columnColor: string
}

export const DayChart: FC<Props> = (props) => {
	const currentDate = useAppSelector(state => state.habitsData.options.selectedTime) ?? new Date().toISOString()
	const data: chartDataItem[] = []
	const actions = useAppSelector(state => state.habitsData.actions)
	const [selectedDate, setSelectedDate] = useState<string>(new Date(currentDate).toISOString())
	const habits = useAppSelector(state => state.habitsData?.untraceableHabits ? [...state.habitsData.habits, ...state.habitsData.untraceableHabits] : state.habitsData.habits).filter((habit: HabitWithRemoveDate) => new Date(selectedDate) >= new Date(habit.addDate) && habit.period === 'daily' && (habit?.removeDate ? new Date(selectedDate) < new Date(habit.removeDate) : true))

	getIsoDates(new Date(selectedDate).getMonth() === new Date(currentDate).getMonth() ? new Date(currentDate).getDate() : new Date(selectedDate).getDate(), new Date(selectedDate).getMonth() === new Date(currentDate).getMonth() ? new Date(currentDate).toISOString() : selectedDate).forEach(date => {
		const localHabits = habits.filter((habit) => new Date(date) >= new Date(habit.addDate))
		let score = 0
		localHabits.forEach(habit => {
			if (habit?.targetValue) {
				const allDayActions = actions.filter(action => action.id === habit.id && new Date(action.date).toDateString() === new Date(date).toDateString()).sort((a, b) => +(new Date(b.date)) - +(new Date(a.date)))
				if (allDayActions.length) {
					score += +(allDayActions[0]?.value ?? 0) >= +habit.targetValue ? 1 : 0
				}
			} else {
				score += actions.find(action => action.id === habit.id && new Date(action.date).toDateString() === new Date(date).toDateString()) ? 1 : 0
			}
		})
		const completed = (score / localHabits.length || 0) * 100
		data.push({
			name: new Date(date).getDate().toLocaleString(),
			procentValue: completed
		})
	})

	return (
		<section>
			<div className={s.header}>
				<button
					disabled={new Date(selectedDate).getMonth() === new Date(currentDate).getMonth() && new Date(selectedDate).getFullYear() === new Date(currentDate).getFullYear()}
					onClick={() => {
						setSelectedDate(getEndOfNextMonth(new Date(selectedDate)).toISOString())
					}}>Следующий месяц
				</button>
				<h3>{getMonthName(new Date(selectedDate).getMonth()) + ' ' + new Date(selectedDate).getFullYear()}</h3>
				<button onClick={() => {
					setSelectedDate(getEndOfPreviousMonth(new Date(selectedDate)).toISOString())
				}}>Предыдущий месяц
				</button>

			</div>
			<BarChart width={window.innerWidth > 1110 ? 1110 : window.innerWidth - 30} height={300} data={data}>
				<CartesianGrid strokeDasharray='2 4' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Bar name={`Процент выполнения привычек`} dataKey='procentValue' fill={props.columnColor} />
				<Legend />
			</BarChart>
		</section>
	)
}
