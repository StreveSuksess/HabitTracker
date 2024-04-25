import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { FC, useState } from 'react'
import { HabitWithRemoveDate } from '../../../models/habitModels.ts'
import {
	addOneMonth,
	getMonthDates,
	getMonthName,
	getWeeksInMonth,
	removeOneMonth,
	resetTime
} from '../../../utils/utils.ts'
import s from './ChartStatistics.module.scss'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { chartDataItem } from '../../../models/chartModel.ts'

type Props = {
	columnColor: string
}

export const WeekChart: FC<Props> = (props) => {
	const currentDate = useAppSelector(state => state.habitsData.options.selectedTime) ?? new Date().toISOString()
	const data: chartDataItem[] = []
	const actions = useAppSelector(state => state.habitsData.actions)
	const [selectedMonthAndYear, setSelectedMonthAndYear] = useState<[number, number]>([new Date(currentDate).getMonth(), new Date(currentDate).getFullYear()])
	const habits = useAppSelector(state => state.habitsData?.untraceableHabits ? [...state.habitsData.habits, ...state.habitsData.untraceableHabits] : state.habitsData.habits).filter((habit: HabitWithRemoveDate) => getMonthDates(...selectedMonthAndYear).lastDay >= resetTime(new Date(habit.addDate)) && habit.period === 'weekly' && (habit?.removeDate ? getMonthDates(...selectedMonthAndYear).lastDay < resetTime(new Date(habit.removeDate)) : true))

	getWeeksInMonth(...selectedMonthAndYear).forEach(dates => {
		const localHabits = habits.filter((habit) => new Date(dates.lastDay) >= resetTime(new Date(habit.addDate)))
		let score = 0
		localHabits.forEach(habit => {
			if (habit?.targetValue) {
				const allWeekActions = actions.filter(action => action.id === habit.id && resetTime(new Date(action.date)) >= new Date(dates.firstDay) && resetTime(new Date(action.date)) <= new Date(dates.lastDay)).sort((a, b) => +(new Date(b.date)) - +(new Date(a.date)))
				if (allWeekActions.length) {
					score += +(allWeekActions[0]?.value ?? 0) >= +habit.targetValue ? 1 : 0
				}
			} else {
				score += actions.find(action => action.id === habit.id && resetTime(new Date(action.date)) >= new Date(dates.firstDay) && resetTime(new Date(action.date)) <= new Date(dates.lastDay)) ? 1 : 0
			}
		})
		const completed = ((score / localHabits.length) || 0) * 100
		data.push({
			name: dates.firstDay.getMonth() < dates.lastDay.getMonth() ? `${dates.firstDay.getDate()} ${getMonthName(dates.firstDay.getMonth())} - ${dates.lastDay.getDate()} ${getMonthName(dates.lastDay.getMonth())}` : `${dates.firstDay.getDate()} - ${dates.lastDay.getDate()} ${getMonthName(dates.lastDay.getMonth())}`,
			procentValue: completed
		})
	})

	return (
		<section>
			<div className={s.header}>
				<button
					disabled={selectedMonthAndYear[0] === new Date(currentDate).getMonth() && selectedMonthAndYear[1] === new Date(currentDate).getFullYear()}
					onClick={() => {
						setSelectedMonthAndYear([addOneMonth(...selectedMonthAndYear).getMonth(), addOneMonth(...selectedMonthAndYear).getFullYear()])
					}}>Следующий месяц
				</button>
				<h3>{getMonthName(selectedMonthAndYear[0]) + ' ' + selectedMonthAndYear[1]}</h3>
				<button onClick={() => {
					setSelectedMonthAndYear([removeOneMonth(...selectedMonthAndYear).getMonth(), removeOneMonth(...selectedMonthAndYear).getFullYear()])
				}}>Предыдущий месяц
				</button>

			</div>
			<BarChart width={window.innerWidth > 1110 ? 1110 : window.innerWidth - 40} height={300} data={data}>
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
