import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.tsx'
import { CoinImage } from '../../assets/tsxImages/CoinImage.tsx'
import s from './Profile.module.scss'
import { NavLink } from 'react-router-dom'
import { ArrowSvg } from '../../assets/Svg/ArrowSvg.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export const Profile = () => {
	const coinsNumber = useAppSelector(state => state.habitsData.coinsNumber)
	const level = useAppSelector(state => state.habitsData.level)
	const { register, handleSubmit } = useForm<any>()
	const [message, setMessage] = useState<string>('')
	const [showMessage, setShowMessage] = useState<boolean>(false)

	const onSubmit = handleSubmit((data) => {
		if (data.message.trim() === '') return
		setMessage(data.message)
		setShowMessage(true)
	})

	return (
		<>
			<h1 className={s.pageTitle}>Ваш профиль</h1>
			<div className={s.levelAndCoinContainer}>
				<h2>Количество монет: {coinsNumber} <CoinImage className={s.coinImg} /></h2>
				<div className={s.levelContainer}>
					<h2>Уровень: {level.levelNumber}</h2>
					<ProgressBar completed={level.currentProgress} />
					<span className='orange-gradient-text'>{level.currentProgress}%</span>
				</div>
			</div>
			<nav className={s.links}>
				<NavLink to='/HabitTracker/profile/planecharacter'>
					<span>Ваш тотемный самолёт</span>
					<ArrowSvg />
				</NavLink>
				<NavLink to='/HabitTracker/profile/shop'>
					<span>Магазин</span>
					<ArrowSvg />
				</NavLink>
				<NavLink to='/HabitTracker/profile/achievements'>
					<span>Достижения</span>
					<ArrowSvg />
				</NavLink>
			</nav>
			<div className={s.coop}>
				<h2>Кооператив</h2>
				<form onSubmit={onSubmit} action='' className={s.form}>
					<label htmlFor=''>
						<h3>Введите сообщение, сгенерируйте ссылку и отправьте её другу - у него появится уведомление!</h3>
						<input type='text' {...register('message', { required: true })} />
					</label>
					<button className={s.submitButton}>Создать</button>
				</form>
				{
					showMessage &&
					<h2>Ваша реферальная ссылка: https://strevesuksess.github.io/HabitTracker/?message={message}</h2>
				}
			</div>
		</>
	)
}
