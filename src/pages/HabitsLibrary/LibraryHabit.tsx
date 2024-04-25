import { FC } from 'react'
import { TLibraryHabit } from './LibraryData.ts'
import s from './HabitsLibrary.module.scss'
import { translatePeriod } from '../../utils/utils.ts'
import { useActions } from '../../hooks/useActions.ts'
import { useNavigate } from 'react-router'

export const LibraryHabit: FC<TLibraryHabit> = (props) => {
	const { addHabit } = useActions()
	const navigate = useNavigate()

	return (
		<article className={s.habit}>
			<div className={s.habitText}>
				<h3>{props.title}</h3>
				<p>{props?.targetValue ? `Период: ${translatePeriod(props.period)}, Цель: ${props.targetValue}` : `Период: ${translatePeriod(props.period)}`}</p>
			</div>
			<button onClick={() => {
				addHabit({
					...props,
					addDate: new Date().toISOString()
				})
				navigate('/HabitTracker')
			}} className={s.addButton}>+
			</button>
		</article>
	)
}
