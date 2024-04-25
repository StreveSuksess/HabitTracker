export interface DataToUpload {
	habits: Habit[];
	actions: HabitAction[];
}

export interface Habit {
	id: number;
	title: string;
	category: string;
	addDate: string;
	period: 'daily' | 'weekly' | 'monthly';
	targetValue?: number;
}

export interface UntraceableHabit extends Habit {
	removeDate: string
}

export interface HabitWithRemoveDate extends Habit {
	removeDate?: string
}

export interface HabitAction {
	id: number;
	date: string;
	value?: number;
}