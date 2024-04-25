import { Dispatch, FC, useState } from 'react'
import s from './Dropdown.module.scss'

type Props = {
	value: string,
	setValue: Dispatch<any>,
	valuesArr: string[],
	translatedValuesArr: {
		[key: string]: string
	},
}

export const Dropdown: FC<Props> = (props) => {
	const [show, setShow] = useState(false)

	return (
		<div className={s.dropdown}>
			<div className={s.main} onClick={() => setShow(show => !show)}>
				<span>{props.translatedValuesArr[props.value]}</span>
				<svg className={show ? s.rotate : ''} width='25' height='24' viewBox='0 0 25 24' fill='none'>
					<path d='M6.5 9L12.5 15L18.5 9' stroke='#2F2F2F' strokeWidth='2' strokeLinecap='round'
								strokeLinejoin='round' />
				</svg>
			</div>
			<div className={show ? `${s.show}  ${s.menu}` : s.menu}>
				{props.valuesArr.map(value => <button key={value} disabled={!show} onClick={() => {
					props.setValue(value)
					setShow(false)
				}}>{props.translatedValuesArr[value]}</button>)}
			</div>
		</div>
	)
}
