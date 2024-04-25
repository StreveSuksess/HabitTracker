import { FC, useEffect, useState } from 'react'
import s from './Habit.module.scss'
import { ActionsSvg } from '../../../assets/Svg/ActionsSvg.tsx'
import { CheckedCheckbox } from '../../../assets/Svg/CheckedCheckbox.tsx'
import { Habit as IHabit, HabitAction } from '../../../models/habitModels.ts'
import { useActions } from '../../../hooks/useActions.ts'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { getWeekNumber } from '../../../utils/utils.ts'

interface Props extends IHabit {
	day?: string,
	week?: number,
	month?: number,
	disableButtons?: boolean
}

export const Habit: FC<Props> = (props) => {
	const { addCoins, addLevelProgress, removeHabit, removeHabitWithHistory, addAction, removeAction } = useActions()
	const habitAction: HabitAction | undefined = useAppSelector(state => state.habitsData.actions).find(action => {
		switch (props.period) {
			case 'daily':
				return action.id === props.id && (new Date(action.date)).getDate() === ((props.day ? new Date(props.day) : new Date)).getDate()
			case 'weekly':
				return action.id === props.id && getWeekNumber(new Date(action.date)) === (props.week ? props.week : getWeekNumber(new Date))
			case 'monthly':
				return action.id === props.id && (new Date(action.date)).getMonth() === (props.month ? props.month : (new Date).getMonth())
		}
	})
	const [active, setActive] = useState<boolean>(!!habitAction)
	const [showActionsPopup, setShowActionsPopup] = useState<boolean>(false)
	useEffect(() => {
		setActive(!!habitAction)
	}, [habitAction])

	return (
		<label title={props.category} className={active ? `${s.habit} ${s.active}` : s.habit}>
			<span className={s.title}>{props.title}</span>
			<div className={s.buttons}>
				{
					!props.disableButtons &&
					<div className={s.checkbox}>
						<input checked={active} onChange={e => {
							if (e.target.checked) {
								addAction({ id: props.id })
								addLevelProgress(10)
								addCoins(10)
							} else {
								removeAction({ id: props.id })
							}
							setActive(e.target.checked)
						}}
									 onClick={() => setActive(active => !active)} name='habit' type='checkbox' />
						<div><CheckedCheckbox /></div>
					</div>
				}
				<button onClick={() => setShowActionsPopup((showActionsPopup) => !showActionsPopup)}>
					<ActionsSvg />
				</button>
			</div>
			{showActionsPopup &&
				<div className={s.actionsPopup}>
					<button onClick={() => removeHabit(props.id)}>Прекратить отслеживание</button>
					<button onClick={() => removeHabitWithHistory(props.id)}>Удалить вместе с историей</button>
				</div>
			}
		</label>
	)
}
