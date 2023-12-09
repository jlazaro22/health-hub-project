export const signUpSchema = {
	schema: {
		description: 'Register patient user with email and password',
		body: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				email: { type: 'string', format: 'email' },
				password: {
					type: 'string',
					format: 'password',
					description: 'alphanumeric with 6 characters minimum',
				},
				gender: { type: 'string' },
				birthDate: { type: 'string', format: 'date' },
				address: { type: 'string' },
				phone: { type: 'string' },
				insuranceProvider: { type: 'string' },
				insurancePolicyNumber: { type: 'string' },
			},
			required: ['name', 'email', 'password', 'gender', 'birthDate'],
		},
		response: {
			201: {
				description: 'patient registration success response',
				type: 'object',
			},
		},
	},
};

export const signInSchema = {
	schema: {
		description: 'Authenticate user with email and password',
		body: {
			type: 'object',
			properties: {
				email: { type: 'string', format: 'email' },
				password: {
					type: 'string',
					format: 'password',
					description: 'alphanumeric with 6 characters minimum',
				},
			},
			required: ['email', 'password'],
		},
		response: {
			200: {
				description: 'login success response includes a bearer token',
				type: 'object',
				properties: {
					token: { type: 'string' },
				},
			},
		},
	},
};

export const logoutSchema = {
	schema: {
		description: 'Logout the active user',
		response: {
			200: {
				description: 'logout success response',
				type: 'object',
			},
		},
	},
};

export const tokenRefreshSchema = {
	schema: {
		description:
			'Generate new set of user tokens if refresh token is still valid',
		response: {
			200: {
				description: 'success response includes a new bearer token',
				type: 'object',
				properties: {
					token: { type: 'string' },
				},
			},
		},
	},
};

export const accountSchema = {
	schema: {
		description: 'Show logged user profile information',
		response: {
			200: {
				description: 'registration success response',
				type: 'object',
				properties: {
					user: {
						type: 'object',
						properties: {
							id: { type: 'string', format: 'cuid' },
							name: { type: 'string' },
							email: { type: 'string', format: 'email' },
							gender: { type: 'string' },
							birthDate: { type: 'string', format: 'date' },
							address: { type: 'string' },
							phone: { type: 'string' },
							insuranceProvider: { type: 'string' },
							insurancePolicyNumber: { type: 'string' },
						},
					},
				},
			},
		},
	},
};
