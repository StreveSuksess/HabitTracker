import { FC } from 'react'
import s from './Shop.module.scss'
import { CoinImage } from '../../../assets/tsxImages/CoinImage.tsx'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { CheckedCheckbox } from '../../../assets/Svg/CheckedCheckbox.tsx'
import { useActions } from '../../../hooks/useActions.ts'
import { TColor } from '../../../store/slices/HabitSlice.ts'

type Props = {
	color: TColor,
	price: number
}

export const ColorItem: FC<Props> = (props) => {
	const currentColor = useAppSelector(state => state.habitsData.shop.currentColor)
	const isPurchased = useAppSelector(state => state.habitsData.shop.purchases.colors).find(purchaseColor => purchaseColor === props.color)
	const { buyColor, setColor } = useActions()

	return (
		<button onClick={() => {
			if (isPurchased) {
				setColor(props.color)
			} else {
				buyColor({ color: props.color, price: props.price })
			}
		}} className={currentColor === props.color ? `${s.gradient} ${s.active}` : s.gradient}>
			<div className={currentColor === props.color ? `${s.selectedItem} ${s.show}` : s.selectedItem}>
				<CheckedCheckbox /></div>
			<div className={s.colorCircle + ' ' + s[props.color]} />
			<h4 className={s.gradientPrice}>{isPurchased ? 'Куплено' : <>{props.price} <CoinImage
				className={s.coinImage} /></>}</h4>
		</button>
	)
}
