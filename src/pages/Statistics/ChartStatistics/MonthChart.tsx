import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { FC, useState } from 'react'
import { HabitWithRemoveDate } from '../../../models/habitModels.ts'
import { getMonthName, getMonthsInYear } from '../../../utils/utils.ts'
import s from './ChartStatistics.module.scss'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { chartDataItem } from '../../../models/chartModel.ts'

type Props = {
	columnColor: string
}

export const MonthChart: FC<Props> = (props) => {
	const currentDate = useAppSelector(state => state.habitsData.options.selectedTime) ?? new Date().toISOString()
	const data: chartDataItem[] = []
	const actions = useAppSelector(state => state.habitsData.actions)
	const [selectedYear, setSelectedYear] = useState<number>(new Date(currentDate).getFullYear())
	const habits = useAppSelector(state => state.habitsData?.untraceableHabits ? [...state.habitsData.habits, ...state.habitsData.untraceableHabits] : state.habitsData.habits).filter((habit: HabitWithRemoveDate) => selectedYear >= new Date(habit.addDate).getFullYear() && habit.period === 'monthly' && (habit?.removeDate ? selectedYear <= new Date(habit.removeDate).getFullYear() : true))
	getMonthsInYear(selectedYear).forEach(dates => {
		const localHabits = habits.filter((habit) => new Date(dates.endDate) >= new Date(habit.addDate))
		let score = 0
		localHabits.forEach(habit => {
			if (habit?.targetValue) {
				const allMonthActions = actions.filter(action => action.id === habit.id && new Date(action.date) >= new Date(dates.startDate) && new Date(action.date) <= new Date(dates.endDate)).sort((a, b) => +(new Date(b.date)) - +(new Date(a.date)))
				if (allMonthActions.length) {
					score += +(allMonthActions[0]?.value ?? 0) >= +habit.targetValue ? 1 : 0
				}
			} else {
				score += actions.find(action => action.id === habit.id && new Date(action.date) >= new Date(dates.startDate) && new Date(action.date) <= new Date(dates.endDate)) ? 1 : 0
			}
		})
		const completed = ((score / localHabits.length) || 0) * 100
		data.push({
			name: getMonthName(dates.startDate.getMonth()) ?? '',
			procentValue: completed
		})
	})

	return (
		<section>
			<div className={s.header}>
				<button
					disabled={selectedYear === new Date(currentDate).getFullYear()}
					onClick={() => {
						setSelectedYear((selectedYear) => selectedYear + 1)
					}}>Следующий год
				</button>
				<h3>{selectedYear}</h3>
				<button onClick={() => {
					setSelectedYear((selectedYear) => selectedYear - 1)
				}}>Предыдущий год
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
