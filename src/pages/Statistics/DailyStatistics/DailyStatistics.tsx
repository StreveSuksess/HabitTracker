import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import s from '../Statistics.module.scss'
import { StatisticsDay } from '../StatisticsDay/StatisticsDay.tsx'
import { HabitList } from '../../../components/HabitList/HabitList.tsx'
import { GoalList } from '../../../components/GoalList/GoalList.tsx'
import { getIsoDates } from '../../../utils/utils.ts'
import { HabitWithRemoveDate } from '../../../models/habitModels.ts'

export const DailyStatistics = () => {
	const currentDate = useAppSelector(state => state.habitsData.options.selectedTime) ?? new Date().toISOString()
	const isoDates = getIsoDates(30, currentDate)
	const [selectedDate, setSelectedDate] = useState<string>(isoDates[0])
	let habits = useAppSelector(state => state.habitsData?.untraceableHabits ? [...state.habitsData.habits, ...state.habitsData.untraceableHabits] : state.habitsData.habits).filter((habit: HabitWithRemoveDate) => new Date(selectedDate) >= new Date(habit.addDate) && habit.period === 'daily' && (habit?.removeDate ? new Date(selectedDate) < new Date(habit.removeDate) : true))
	useEffect(() => {
		habits = habits.filter((habit: HabitWithRemoveDate) => habit?.removeDate ? new Date(selectedDate) > new Date(habit.addDate) && new Date(selectedDate) < new Date(habit.removeDate) : new Date(selectedDate) > new Date(habit.addDate))
	}, [selectedDate])

	return (
		<>
			<div className={s.dayList}>
				{
					isoDates.map(date => <StatisticsDay key={date} selectFunction={setSelectedDate} date={date}
																							active={new Date(selectedDate).toDateString() === new Date(date).toDateString()} />)
				}
			</div>

			<HabitList day={selectedDate} habitArray={habits} period={'daily'} disableButtons={true} />
			<GoalList day={selectedDate} habitArray={habits} period={'daily'} disableButtons={true} />
		</>
	)
}