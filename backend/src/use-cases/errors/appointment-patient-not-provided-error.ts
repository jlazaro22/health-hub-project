export class AppointmentPatientNotProvidedError extends Error {
	constructor() {
		super('PatientId needed to register an appointment.');
	}
}
