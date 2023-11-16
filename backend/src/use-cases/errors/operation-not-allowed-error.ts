export class OperationNotAllowedError extends Error {
	constructor() {
		super('Operation not allowed');
	}
}
