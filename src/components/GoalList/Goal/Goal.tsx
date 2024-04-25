import { FC, useState } from 'react'
import s from './Goal.module.scss'
import { ActionsSvg } from '../../../assets/Svg/ActionsSvg.tsx'
import { Habit as IHabit } from '../../../models/habitModels.ts'
import { useActions } from '../../../hooks/useActions.ts'
import { ProgressBar } from '../../ProgressBar/ProgressBar.tsx'
import { CrossSvg } from '../../../assets/Svg/CrossSvg.tsx'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { useForm } from 'react-hook-form'
import { getWeekNumber } from '../../../utils/utils.ts'

interface Props extends Omit<IHabit, 'targetValue'> {
	targetValue: number;
	day?: string;
	disableButtons?: boolean;
}

export const Goal: FC<Props> = (props) => {
	const actionsWithHabit = useAppSelector(state => state.habitsData.actions).filter(action => {
		switch (props.period) {
			case 'daily':
				return action.id === props.id && (new Date(action.date)).getDate() === ((props.day ? new Date(props.day) : new Date)).getDate()
			case 'weekly':
				return action.id === props.id && getWeekNumber(new Date(action.date)) === getWeekNumber(new Date)
			case 'monthly':
				return action.id === props.id && (new Date(action.date)).getMonth() === (new Date).getMonth()
		}
	})
	const lastValue: number = !!actionsWithHabit.length ? actionsWithHabit.reduce((acc, cur) => cur.date > acc.date ? cur : acc).value ?? 0 : 0
	const { removeHabit, removeHabitWithHistory, addAction } = useActions()
	const [showActionsPopup, setShowActionsPopup] = useState<boolean>(false)
	const [showAddExecutionPopup, setShowAddExecutionPopup] = useState<boolean>(false)
	const { register, handleSubmit } = useForm<any>()

	return (
		<article title={props.category} className={+lastValue >= +props.targetValue ? `${s.goal} ${s.active}` : s.goal}>
			<div className={s.titleContainer}>
				<span className={s.title}>{props.title}</span>
				<button onClick={() => setShowActionsPopup((showActionsPopup) => !showActionsPopup)}>
					<ActionsSvg />
				</button>
			</div>
			<ProgressBar completed={(+lastValue >= +props.targetValue ? 1 : +lastValue / +props.targetValue) * 100} />
			<div className={s.buttonAndP}>
				{
					!props.disableButtons &&
					<button onClick={() => setShowAddExecutionPopup(true)} className={s.addExecutionButton}>+</button>
				}
				<p className={s.completedText}>{lastValue} из {props.targetValue}</p>
			</div>
			{showActionsPopup &&
				<div className={s.actionsPopup}>
					<button onClick={() => removeHabit(props.id)}>Прекратить отслеживание</button>
					<button onClick={() => removeHabitWithHistory(props.id)}>Удалить вместе с историей</button>
				</div>
			}
			{
				showAddExecutionPopup &&
				<>
					<div className={s.background}></div>
					<div className={s.popup}>
						<div className={s.popupTitleContainer}>
							<h2>Какое значение вы хотите установить?</h2>
							<button onClick={() => setShowAddExecutionPopup(false)}><CrossSvg /></button>
						</div>
						<form onSubmit={handleSubmit((data, event) => {
							addAction({
								id: props.id,
								value: data.value
							})
							event?.target.reset()
							setShowAddExecutionPopup(false)
						})} className={s.inputAndButton}>
							<input min='0'
										 type='number' {...register('value', { required: true })} />
							<button type='submit'>Установить</button>
						</form>
					</div>
				</>
			}
		</article>
	)
}
