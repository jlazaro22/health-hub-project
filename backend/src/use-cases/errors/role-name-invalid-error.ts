export class RoleNameInvalidError extends Error {
	constructor(roleName: string | null) {
		super(`${roleName ? roleName : '"PACIENTE"'} profile does not exist.`);
	}
}
