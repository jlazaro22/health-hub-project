import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { RoleNameInvalidError } from '@/use-cases/errors/role-name-invalid-error';
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case';

export async function createUser(req: FastifyRequest, rep: FastifyReply) {
	const createUserBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		role: z.string(),
	});

	const { name, email, password, role } = createUserBodySchema.parse(req.body);
	const loggedUserRole = req.user.roleName;

	const roleNormalized = role.trim().toUpperCase();

	try {
		const createUserUseCase = makeCreateUserUseCase();

		if (roleNormalized === 'PACIENTE') {
			const createPatientBodySchema = z.object({
				gender: z.string(),
				birthDate: z.coerce.date(),
				address: z.string().optional(),
				phone: z.string().optional(),
				insuranceProvider: z.string().optional(),
				insurancePolicyNumber: z.string().optional(),
			});

			const {
				gender,
				birthDate,
				address,
				phone,
				insuranceProvider,
				insurancePolicyNumber,
			} = createPatientBodySchema.parse(req.body);

			await createUserUseCase.execute(
				{
					name,
					email,
					password,
					role,
					loggedUserRole,
				},
				{
					gender,
					birthDate,
					address,
					phone,
					insuranceProvider,
					insurancePolicyNumber,
				},
				undefined
			);
		}

		if (roleNormalized === 'MEDICO') {
			const createDoctorBodySchema = z.object({
				gender: z.string(),
				photoUrl: z.string().optional(),
				birthDate: z.coerce.date().optional(),
				phone: z.string().optional(),
				licenseNumber: z.string(),
				licenseExpiryDate: z.coerce.date(),
			});

			const {
				gender,
				photoUrl,
				birthDate,
				phone,
				licenseNumber,
				licenseExpiryDate,
			} = createDoctorBodySchema.parse(req.body);

			await createUserUseCase.execute(
				{
					name,
					email,
					password,
					role,
					loggedUserRole,
				},
				undefined,
				{
					gender,
					photoUrl,
					birthDate,
					phone,
					licenseNumber,
					licenseExpiryDate,
				}
			);
		}

		if (roleNormalized !== 'PACIENTE' && roleNormalized !== 'MEDICO') {
			await createUserUseCase.execute({
				name,
				email,
				password,
				role,
				loggedUserRole,
			});
		}
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return rep.status(409).send();
		}

		if (err instanceof RoleNameInvalidError) {
			return rep.status(400).send();
		}

		throw err;
	}

	return rep.status(201).send();
}
