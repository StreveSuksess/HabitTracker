import { ChartStatistics } from './ChartStatistics/ChartStatistics.tsx'
import { DailyStatistics } from './DailyStatistics/DailyStatistics.tsx'
import s from './Statistics.module.scss'
import { useState } from 'react'

export const Statistics = () => {
	const [selectedStatistic, setSelectedStatistic] = useState<'calendar' | 'chart'>('calendar')

	return (
		<>
			<div className={s.chooseStatisticButtons}>
				<button className={selectedStatistic === 'calendar' ? s.active : ''}
								onClick={() => setSelectedStatistic('calendar')}>Календарь
				</button>
				<button className={selectedStatistic === 'chart' ? s.active : ''}
								onClick={() => setSelectedStatistic('chart')}>Графики
				</button>
			</div>
			{
				selectedStatistic === 'calendar' && <DailyStatistics />
			}
			{
				selectedStatistic === 'chart' && <ChartStatistics />
			}
		</>
	)
}
