import { FC } from 'react'
import s from './Shop.module.scss'
import { CoinImage } from '../../../assets/tsxImages/CoinImage.tsx'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { CheckedCheckbox } from '../../../assets/Svg/CheckedCheckbox.tsx'
import { useActions } from '../../../hooks/useActions.ts'
import { TGradient } from '../../../store/slices/HabitSlice.ts'

type Props = {
	gradient: TGradient,
	price: number
}

export const GradientItem: FC<Props> = (props) => {
	const currentGradient = useAppSelector(state => state.habitsData.shop.currentGradient)
	const isPurchased = useAppSelector(state => state.habitsData.shop.purchases.gradients).find(purchaseGradient => purchaseGradient === props.gradient)
	const { buyGradient, setGradient } = useActions()

	return (
		<button onClick={() => {
			if (isPurchased) {
				setGradient(props.gradient)
			} else {
				buyGradient({ gradient: props.gradient, price: props.price })
			}
		}} className={currentGradient === props.gradient ? `${s.gradient} ${s.active}` : s.gradient}>
			<div className={currentGradient === props.gradient ? `${s.selectedItem} ${s.show}` : s.selectedItem}>
				<CheckedCheckbox /></div>
			<div className={s.gradientCircle + ' ' + s[props.gradient]} />
			<h4 className={s.gradientPrice}>{isPurchased ? 'Куплено' : <>{props.price} <CoinImage
				className={s.coinImage} /></>}</h4>
		</button>
	)
}
