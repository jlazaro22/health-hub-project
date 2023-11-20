export class SpecialtyAlreadyExistsError extends Error {
	constructor() {
		super('Specialty already registered.');
	}
}
