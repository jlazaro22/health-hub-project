export class DoctorScheduleAlreadyTakenError extends Error {
	constructor() {
		super('Doctor schedule already taken.');
	}
}
