export class DoctorScheduleOutdatedError extends Error {
	constructor() {
		super('Doctor schedule provided is outdated.');
	}
}
