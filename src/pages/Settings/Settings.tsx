import { useActions } from '../../hooks/useActions.ts'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { useForm } from 'react-hook-form'
import s from './Settings.module.scss'
import { useEffect, useState } from 'react'

export const Settings = () => {
	const [file, setFile] = useState<File | null>(null)
	const selectedTime = useAppSelector(state => state.habitsData.options?.selectedTime) ?? (new Date()).toISOString()
	const { register, handleSubmit } = useForm<any>()
	const { selectTime, resetTime, setData } = useActions()

	const onSubmitTime = handleSubmit((data, event) => {
		event?.preventDefault()
		selectTime(new Date(data?.selectedTime).toISOString())
		event?.target.reset()
	})

	useEffect(() => {
		if (file) {
			const reader = new FileReader()
			reader.onload = function() {
				const text = reader.result
				if (typeof text === 'string') {
					const json = JSON.parse(text)
					setData(json)
				}
			}
			reader.readAsText(file)
		}
	}, [file])

	return (
		<section className={s.settings}>
			<h2>Установленное время: {new Date(selectedTime).toLocaleString()}</h2>
			<form className={s.form} onSubmit={onSubmitTime}>
				<label htmlFor='selectedDate'>
					<span>Машина времени</span>
					<input  {...register('selectedTime', { required: true })} type='date' />
				</label>
				<button type={'submit'}>Установить время</button>
			</form>
			<button onClick={() => resetTime()}>Вернуться в настоящее</button>
			<label className={s.fileLabel}>
				<span>Выбрать файл для загрузки</span>
				<input onChange={(event) => {
					if (event.target?.files && event.target?.files[0]) {
						setFile(event.target.files[0])
					}
				}} type='file' />
			</label>
		</section>
	)
}
