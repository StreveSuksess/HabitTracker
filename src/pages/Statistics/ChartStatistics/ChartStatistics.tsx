import { FC } from 'react'
import { DayChart } from './DayChart.tsx'
import { WeekChart } from './WeekChart.tsx'
import { MonthChart } from './MonthChart.tsx'
import s from './ChartStatistics.module.scss'
import { getColumnColor } from '../../../utils/utils.ts'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'


export const ChartStatistics: FC = () => {
	const columnColor = useAppSelector(state => state.habitsData.shop.currentColor)

	return (
		<ul className={s.chartsUl}>
			<li>
				<h2>Статистика по дням</h2>
				<DayChart columnColor={getColumnColor(columnColor)} />
			</li>
			<li>
				<h2>Статистика по неделям</h2>
				<WeekChart columnColor={getColumnColor(columnColor)} />
			</li>
			<li>
				<h2>Статистика по месяцам</h2>
				<MonthChart columnColor={getColumnColor(columnColor)} />
			</li>
		</ul>
	)
}
