import s from './Shop.module.scss'
import { GradientItem } from './GradientItem.tsx'
import { ColorItem } from './ColorItem.tsx'
import { Link } from 'react-router-dom'
import { ArrowSvg } from '../../../assets/Svg/ArrowSvg.tsx'

type shopItem = {
	value: string,
	price: number
}

const gradientItems: shopItem[] = [
	{
		value: 'orange',
		price: 0
	},
	{
		value: 'blue',
		price: 100
	},
	{
		value: 'pink',
		price: 350
	},
	{
		value: 'yellow',
		price: 400
	}
]

const colorItems: shopItem[] = [
	{
		value: 'green',
		price: 0
	},
	{
		value: 'blue',
		price: 400
	},
	{
		value: 'pink',
		price: 600
	},
	{
		value: 'yellow',
		price: 1000
	}
]

export const Shop = () => {
	return (
		<section>
			<Link to='/HabitTracker/profile' className='back-link'><ArrowSvg /> <span>Назад к профилю</span></Link>
			<h1 className={s.shopTitle}>Магазин</h1>
			<div className={s.shopCategory}>
				<h2>Цвет линии прогресса</h2>
				<ul className={s.shopUl}>
					{
						// @ts-ignore
						gradientItems.map(gradient => <li key={gradient.value}><GradientItem gradient={gradient.value}
																																								 price={gradient.price} /></li>)
					}
				</ul>
			</div>
			<div className={s.shopCategory}>
				<h2>Цвет столбика графиков</h2>
				<ul className={s.shopUl}>
					{
						// @ts-ignore
						colorItems.map(color => <li key={color.value}><ColorItem color={color.value}
																																		 price={color.price} /></li>)
					}
				</ul>
			</div>
		</section>
	)
}
