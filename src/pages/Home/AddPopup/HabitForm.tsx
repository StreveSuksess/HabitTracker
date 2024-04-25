import s from './AddPopup.module.scss'
import { Dropdown } from '../../../components/Dropdown/Dropdown.tsx'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useActions } from '../../../hooks/useActions.ts'
import { Habit } from '../../../models/habitModels.ts'

type Props = {
	closePopup: () => void
}

export const HabitForm: FC<Props> = (props) => {
	const [period, setPeriod] = useState<Habit['period']>('daily')
	const [category, setCategory] = useState<string>('Здоровье')
	const { register, handleSubmit } = useForm<any>()
	const { addHabit } = useActions()

	const onSubmit = handleSubmit((data, event) => {
		if (data.title.trim() === '') return
		addHabit({
			title: data.title.trim(),
			period: period,
			addDate: new Date().toISOString(),
			category: category
		})
		props.closePopup()
		event?.target.reset()
		setPeriod('daily')
		setCategory('health')
	})

	return (
		<form onSubmit={onSubmit} action='' className={s.form}>
			<label htmlFor=''>
				<h3>Название привычки</h3>
				<input type='text' {...register('title', { required: true })} />
			</label>
			<div className={s.dropdownContainer}>
				<span>Период</span>
				<Dropdown value={period} setValue={setPeriod} valuesArr={['daily', 'weekly', 'monthly']}
									translatedValuesArr={{
										'daily': 'Дневная',
										'weekly': 'Недельная',
										'monthly': 'Месячная'
									}} />
			</div>
			<div className={s.dropdownContainer}>
				<span>Категория</span>
				<Dropdown value={category} setValue={setCategory}
									valuesArr={['Здоровье', 'Спорт', 'Образование', 'Физическая активность', 'Финансовая грамотность', 'Самообразование', 'Семья', 'Работа', 'Другое']}
									translatedValuesArr={{
										'Здоровье': 'Здоровье',
										'Спорт': 'Спорт',
										'Образование': 'Образование',
										'Физическая активность': 'Физическая активность',
										'Финансовая грамотность': 'Финансовая грамотность',
										'Самообразование': 'Самообразование',
										'Семья': 'Семья',
										'Работа': 'Работа',
										'Другое': 'Другое'
									}} />
			</div>
			<button className={s.submitButton}>Создать</button>
		</form>
	)
}
