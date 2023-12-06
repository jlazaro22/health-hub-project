export class AppointmentDoctorNotProvidedError extends Error {
	constructor() {
		super('DoctorId not provided.');
	}
}
