import { FC, useEffect, useState } from 'react'
import s from './Home.module.scss'
import { HabitList } from '../../components/HabitList/HabitList.tsx'
import { AddPopup } from './AddPopup/AddPopup.tsx'
import { GoalList } from '../../components/GoalList/GoalList.tsx'
import { Habit } from '../../models/habitModels.ts'
import { Bounce, toast } from 'react-toastify'

const notify = (text: string) => toast(text, {
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

export const Home: FC = () => {
	const [showAddPopup, setShowAddPopup] = useState<boolean>(false)
	const [period, setPeriod] = useState<Habit['period']>('daily')
	const queryParameters = new URLSearchParams(window.location.search)

	useEffect(() => {
		if (queryParameters.get('message')) {
			notify('Вам сообщение от друга: ' + queryParameters.get('message'))
		}
	}, [])

	return (
		<div className={s.home}>
			<h3 className={s.date}>{new Date().toLocaleDateString('ru-Ru')}</h3>
			<div className={s.periodButtons}>
				<button className={period === 'daily' ? s.active : ''} onClick={() => setPeriod('daily')}>Дневные</button>
				<button className={period === 'weekly' ? s.active : ''} onClick={() => setPeriod('weekly')}>Недельные</button>
				<button className={period === 'monthly' ? s.active : ''} onClick={() => setPeriod('monthly')}>Месячные</button>
			</div>
			<HabitList period={period} />
			<GoalList period={period} />
			<button className={s.addButton} onClick={() => setShowAddPopup(showAddPopup => !showAddPopup)}><span>+</span>
			</button>
			{showAddPopup &&
				<AddPopup closePopup={() => setShowAddPopup(false)} />
			}
		</div>
	)
}
