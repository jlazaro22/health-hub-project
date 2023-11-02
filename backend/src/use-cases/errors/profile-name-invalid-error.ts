export class ProfileNameInvalidError extends Error {
	constructor(profileName: string | null) {
		super(
			`${profileName ? profileName : '"PACIENTE"'} profile does not exist.`
		);
	}
}
