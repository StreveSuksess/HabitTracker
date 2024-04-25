export type TLibraryHabit = {
	title: string,
	category: string,
	period: 'daily' | 'weekly' | 'monthly',
	targetValue?: number
}

export type LibraryData = {
	categoryName: string,
	categoryHabits: TLibraryHabit[]
}[]

export const libraryData: LibraryData = [
	{
		categoryName: 'Финансовая грамотность',
		categoryHabits: [
			{
				title: 'Смотреть одно видео про финансы',
				category: 'Финансовая грамотность',
				period: 'daily'
			},
			{
				title: 'Отложить 10% своего заработка в накопительный счёт',
				category: 'Финансовая грамотность',
				period: 'monthly'
			},
			{
				title: 'Выделить 10000 рублей на благотворительность',
				category: 'Финансовая грамотность',
				period: 'weekly',
				targetValue: 10000
			}
		]
	},
	{
		categoryName: 'Саморазвитие',
		categoryHabits: [
			{
				title: 'Читать 10 страниц книги',
				category: 'Саморазвитие',
				period: 'daily'
			},
			{
				title: 'Посмотреть мотивационное видео',
				category: 'Саморазвитие',
				period: 'daily'
			},
			{
				title: 'Встретиться с 3 девшками',
				category: 'Саморазвитие',
				period: 'weekly',
				targetValue: 3
			}
		]
	},
	{
		categoryName: 'Физическая активность',
		categoryHabits: [
			{
				title: 'Качать пресс',
				category: 'Физическая активность',
				period: 'daily'
			},
			{
				title: 'Съесть 400г протеина',
				category: 'Физическая активность',
				period: 'daily',
				targetValue: 400
			},
			{
				title: 'Сходить на тренировку 3 раза',
				category: 'Физическая активность',
				period: 'weekly',
				targetValue: 3
			}
		]
	},
	{
		categoryName: 'Языки',
		categoryHabits: [
			{
				title: 'Выучить 10 слов на английском',
				category: 'Языки',
				period: 'daily',
				targetValue: 10
			},
			{
				title: 'Позвонить иностранцу',
				category: 'Языки',
				period: 'weekly'
			},
			{
				title: 'Научить русскому 5 мигрантов',
				category: 'Языки',
				period: 'monthly',
				targetValue: 5
			}
		]
	}
]