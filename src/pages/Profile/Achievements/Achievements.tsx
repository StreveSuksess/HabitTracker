import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import s from './Achievements.module.scss'
import { Achievement } from './Achievement.tsx'
import { Link } from 'react-router-dom'
import { ArrowSvg } from '../../../assets/Svg/ArrowSvg.tsx'

export const Achievements = () => {
	const achievements = useAppSelector(state => state.habitsData.achievements)

	return (
		<section className={s.achievements}>
			<Link to='/HabitTracker/profile' className='back-link'><ArrowSvg /> <span>Назад к профилю</span></Link>
			<h1>Ваши достижения</h1>
			<div className={s.group}>
				<h2>Выполненные нецелевые привычки</h2>
				<ul className={s.achievementUl}>
					{achievements.completedHabits.map((achievement, index) => <li key={index}><Achievement {...achievement} />
					</li>)}
				</ul>
			</div>
			<div className={s.group}>
				<h2>Произведено действий с привычками</h2>
				<ul className={s.achievementUl}>
					{achievements.actions.map((achievement, index) => <li key={index}><Achievement {...achievement} />
					</li>)}
				</ul>
			</div>
			<div className={s.group}>
				<h2>Серия захода в приложение</h2>
				<ul className={s.achievementUl}>
					{achievements.activeScore.map((achievement, index) => <li key={index}><Achievement {...achievement} />
					</li>)}
				</ul>
			</div>
		</section>
	)
}
