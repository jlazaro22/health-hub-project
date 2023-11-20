export class MedicineAlreadyExistsError extends Error {
	constructor() {
		super('Medicine already registered.');
	}
}
