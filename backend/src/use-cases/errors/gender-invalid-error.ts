export class GenderInvalidError extends Error {
	constructor() {
		super('Allowed genders are: MALE, FEMALE, MASCULINO, FEMININO');
	}
}
