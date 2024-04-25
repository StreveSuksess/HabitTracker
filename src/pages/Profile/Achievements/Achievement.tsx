import { FC } from 'react'
import { TAchievement } from '../../../store/slices/HabitSlice.ts'
import { DartsSvg } from '../../../assets/Svg/DartsSvg.tsx'
import s from './Achievements.module.scss'

export const Achievement: FC<TAchievement> = (props) => {
	return (
		<article className={props.completed ? `${s.achievement} ${s.completed}` : s.achievement}>
			<DartsSvg />
			{props.value}
		</article>
	)
}
