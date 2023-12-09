export const createUserSchema = {
	schema: {
		description:
			'Create a new user and depending on the role provided, create also a doctor or a patient providing respective fields.',
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
				role: {
					type: 'string',
					description: 'Accepts: ADMINISTRADOR, COLABORADOR, MEDICO, PACIENTE',
				},
				gender: { type: 'string' },
				birthDate: { type: 'string', format: 'date' },
				address: { type: 'string' },
				phone: { type: 'string' },
				insuranceProvider: { type: 'string' },
				insurancePolicyNumber: { type: 'string' },
				photoUrl: { type: 'string' },
				licenseNumber: { type: 'string' },
				licenseExpiryDate: { type: 'string', format: 'date' },
			},
			required: [
				'name',
				'email',
				'password',
				'gender',
				'birthDate',
				'licenseNumber',
				'licenseExpiryDate',
			],
		},
		response: {
			201: {
				description: 'success response after user creation',
				type: 'object',
			},
		},
	},
};

export const searchUsersSchema = {
	schema: {
		description: 'Get all users or filter by name or email (10 per page)',
		querystring: {
			query: { type: 'string', default: '' },
			page: { type: 'number', default: 1 },
		},
		response: {
			200: {
				description:
					'success response with an array of user objects, page number and total pages',
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
