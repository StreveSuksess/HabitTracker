import { FC } from 'react'
import { Habit as IHabit } from '../../models/habitModels.ts'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import s from '../HabitList/HabitList.module.scss'
import { Goal } from './Goal/Goal.tsx'

type Props = {
	period: IHabit['period'],
	habitArray?: IHabit[],
	disableButtons?: boolean,
	day?: string
}

export const GoalList: FC<Props> = (props) => {
	let goals: IHabit[] = props.habitArray ?? useAppSelector((state) => state.habitsData.habits)
	goals = goals.filter((goal: IHabit) => goal?.targetValue && goal.period === props.period)

	return (
		<div className={s.list}>
			<div className={s.titleContainer}>
				<h2>{props.period === 'daily' && 'Дневные'} {props.period === 'weekly' && 'Недельные'} {props.period === 'monthly' && 'Месячные'} цели</h2>
				{/*{!!goals.length &&*/}
				{/*	<a href='' className='orange-gradient-text'>Смотреть все</a>*/}
				{/*}*/}
			</div>
			{!goals.length &&
				<p className={s.emptyP}>У вас
					нет {props.period === 'daily' && 'дневных'} {props.period === 'weekly' && 'недельных'} {props.period === 'monthly' && 'месячных'} целей</p>
			}
			<ul className={s.ul}>
				{
					goals.map((goal) => <li
						key={goal.id}>
						{
							<Goal day={props.day} disableButtons={props.disableButtons}
										{...goal} targetValue={goal.targetValue ?? 0} />
						}

					</li>)
				}
			</ul>
		</div>
	)
}