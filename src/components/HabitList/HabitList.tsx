import { FC } from 'react'
import s from './HabitList.module.scss'
import { Habit } from './Habit/Habit.tsx'
import { Habit as IHabit } from '../../models/habitModels.ts'
import { useAppSelector } from '../../hooks/useAppSelector.ts'

type Props = {
	period: IHabit['period'],
	habitArray?: IHabit[],
	disableButtons?: boolean,
	day?: string,
}

export const HabitList: FC<Props> = (props) => {
	let habits: IHabit[] = props.habitArray ?? useAppSelector((state) => state.habitsData.habits)
	habits = habits.filter((habit: IHabit) => habit?.targetValue === undefined && habit.period === props.period)

	return (
		<div className={s.list}>
			<div className={s.titleContainer}>
				<h2>{props.period === 'daily' && 'Дневные'} {props.period === 'weekly' && 'Недельные'} {props.period === 'monthly' && 'Месячные'} привычки</h2>
			</div>
			{!habits.length &&
				<p className={s.emptyP}>У вас
					нет {props.period === 'daily' && 'дневных'} {props.period === 'weekly' && 'недельных'} {props.period === 'monthly' && 'месячных'} привычек</p>
			}
			<ul className={s.ul}>
				{
					habits.map((habit) =>
						<li key={habit.id}>
							<Habit day={props.day}
										 disableButtons={!!props.disableButtons}
										 {...habit} />
						</li>)
				}
			</ul>
		</div>
	)
}
