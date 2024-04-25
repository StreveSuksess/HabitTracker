import s from './ProgressBar.module.scss'
import { FC } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector.ts'

type Props = {
	completed: number
}

export const ProgressBar: FC<Props> = (props) => {
	const currentGradient = useAppSelector(state => state.habitsData.shop.currentGradient)

	return (
		<div className={s.container}>
			<span className={s.line + ' ' + s[currentGradient]}
						style={{ width: props.completed > 100 ? '100%' : props.completed + '%' }}></span>
		</div>
	)
}
