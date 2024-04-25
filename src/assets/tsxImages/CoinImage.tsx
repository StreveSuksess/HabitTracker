import imgPng from '../images/coin.png'
import imgWebp from '../images/coin.webp'
import { FC } from 'react'

type Props = {
	className: string
}

export const CoinImage: FC<Props> = (props) => {
	return (
		<picture className={props.className}>
			<source srcSet={imgWebp} type='image/webp' />
			<img src={imgPng} alt='Coin' />
		</picture>
	)
}
