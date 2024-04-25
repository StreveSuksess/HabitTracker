import s from './AddPopup.module.scss'
import { CrossSvg } from '../../../assets/Svg/CrossSvg.tsx'
import { FC, useState } from 'react'
import { HabitForm } from './HabitForm.tsx'
import { GoalForm } from './GoalForm.tsx'

type Props = {
	closePopup: () => void
}

export const AddPopup: FC<Props> = (props) => {
	const [showChooseButtons, setShowChooseButtons] = useState<boolean>(true)
	const [showHabitForm, setShowHabitForm] = useState<boolean>(false)
	const [showGoalForm, setShowGoalForm] = useState<boolean>(false)

	return (
		<>
			<div className={s.background}></div>
			<div className={s.addPopup}>
				<div className={s.addPopupTitleContainer}>
					<h2>Создать {showHabitForm && 'обычную привычку'} {showGoalForm && 'привычку с целью'}</h2>
					<button onClick={() => props.closePopup()}><CrossSvg /></button>
				</div>
				{
					showChooseButtons &&
					<div className={s.chooseButtons}>
						<button onClick={() => {
							setShowChooseButtons(false)
							setShowGoalForm(true)
						}}>Привычку с целью
						</button>
						<button onClick={() => {
							setShowChooseButtons(false)
							setShowHabitForm(true)
						}}>Обычную привычку
						</button>
					</div>
				}
				{
					showHabitForm && <HabitForm closePopup={props.closePopup} />
				}
				{
					showGoalForm && <GoalForm closePopup={props.closePopup} />
				}
			</div>
		</>
	)
}
