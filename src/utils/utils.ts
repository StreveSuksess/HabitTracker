import { Habit } from '../models/habitModels.ts'
import { TColor } from '../store/slices/HabitSlice.ts'

export const getWeekNumber = (date: Date): number => {
	const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
	return Math.ceil((dayOfYear + Math.floor(date.getTimezoneOffset() / 60 / 24)) / 7)
}

export const getIsoDates = (daysCount: number, startDate: string = new Date().toISOString()): string[] => {
	const pastDates: Date[] = [new Date(startDate)]

	for (let i = 1; i < daysCount; i++) {
		let pastDate = new Date(startDate)
		pastDate.setDate(new Date(startDate).getDate() - i)
		pastDates.push(pastDate)
	}

	return pastDates.map(date => date.toISOString())
}

export const getMonthName = (monthNumber: number): string | undefined => {
	const monthNames = [
		'январь',
		'февраль',
		'март',
		'апрель',
		'май',
		'июнь',
		'июль',
		'август',
		'сентябрь',
		'октябрь',
		'ноябрь',
		'декабрь'
	]

	if (monthNumber < 0 || monthNumber > 12) {
		return undefined
	}

	return monthNames[monthNumber]
}

export const getEndOfPreviousMonth = (date: Date): Date => {
	const newDate = new Date(date)
	newDate.setMonth(newDate.getMonth(), 0)
	return newDate
}
export const getEndOfNextMonth = (date: Date): Date => {
	const newDate = new Date(date)
	newDate.setMonth(newDate.getMonth() + 2, 0)
	return newDate
}

export const getWeekDates = (week: number, year: number): { firstDay: Date; lastDay: Date } => {
	const date = new Date(year, 0, 1 + (week - 1) * 7)
	const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
	const lastDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6 - date.getDay())

	return {
		firstDay: firstDayOfWeek,
		lastDay: lastDayOfWeek
	}
}

export const getMonthDates = (month: number, year: number): { firstDay: Date, lastDay: Date } => {
	const firstDay = new Date(year, month, 1)
	const lastDay = new Date(year, month + 1, 0)
	return { firstDay, lastDay }
}

export const getWeeksInMonth = (month: number, year: number): { firstDay: Date; lastDay: Date }[] => {
	const firstDayOfMonth = new Date(year, month, 1)
	const lastDayOfMonth = new Date(year, month + 1, 0)
	const weeks: { firstDay: Date; lastDay: Date }[] = []

	let currentDate = firstDayOfMonth
	let currentWeek: { firstDay: Date; lastDay: Date } = { firstDay: currentDate, lastDay: currentDate }

	while (currentDate <= lastDayOfMonth) {
		const nextDay = new Date(currentDate.getTime())
		nextDay.setDate(currentDate.getDate() + 1)
		if (nextDay.getDay() === 1) {
			weeks.push(currentWeek)
			currentWeek = { firstDay: nextDay, lastDay: nextDay }
		} else {
			currentWeek.lastDay = nextDay
		}
		currentDate = nextDay
	}
	weeks.push(currentWeek)

	return weeks
}

export const addOneMonth = (month: number, year: number): Date => {
	const date = new Date(year, month, 1)
	date.setMonth(date.getMonth() + 1)
	return date
}

export const removeOneMonth = (month: number, year: number): Date => {
	const date = new Date(year, month, 1)
	date.setMonth(date.getMonth() - 1)
	return date
}

export const resetTime = (date: Date): Date => {
	date.setHours(0, 0, 0, 0)
	return date
}

type MonthObject = {
	startDate: Date;
	endDate: Date;
}

export const getMonthsInYear = (year: number): MonthObject[] => {
	const months: MonthObject[] = []
	for (let month = 1; month <= 12; month++) {
		const startDate = new Date(year, month - 1, 1)
		const endDate = new Date(year, month, 0)
		months.push({
			startDate,
			endDate
		})
	}
	return months
}

export const translatePeriod = (period: Habit['period']): string => {
	const russianWords = {
		'daily': 'Дневная',
		'weekly': 'Недельная',
		'monthly': 'Месячная'
	}

	return russianWords[period]
}

export const getColumnColor = (color: TColor): string => {
	const hashColors = {
		'green': '#37C871',
		'blue': '#00E5FF',
		'pink': '#FF005B',
		'yellow': '#FFE53B'
	}

	return hashColors[color]
}