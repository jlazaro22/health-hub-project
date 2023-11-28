export class ScheduleOutsideWorkingHoursError extends Error {
	constructor() {
		super('Schedule outside working hours.');
	}
}
