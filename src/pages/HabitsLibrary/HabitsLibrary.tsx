import { LibraryHabit } from './LibraryHabit.tsx'
import { libraryData } from './LibraryData.ts'
import s from './HabitsLibrary.module.scss'

export const HabitsLibrary = () => {
	return (
		<section className={s.habitsLibrarySection}>
			{libraryData.map((category) => (
				<div className={s.habitsLibraryItem} key={category.categoryName}>
					<h2>{category.categoryName}</h2>
					<ul className={s.habitsUl}>
						{category.categoryHabits.map((habit, index) => <li key={index}><LibraryHabit {...habit} /></li>)}
					</ul>
				</div>
			))}
		</section>
	)
}
