export class DoctorScheduleAlreadyExistsError extends Error {
	constructor() {
		super('Doctor schedule already registered.');
	}
}
