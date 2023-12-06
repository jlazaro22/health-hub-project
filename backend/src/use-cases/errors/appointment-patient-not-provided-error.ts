export class AppointmentPatientNotProvidedError extends Error {
	constructor() {
		super('PatientId not provided.');
	}
}
