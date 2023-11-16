import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { RoleNameInvalidError } from '@/use-cases/errors/role-name-invalid-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { GenderInvalidError } from '@/use-cases/errors/gender-invalid-error';

export async function register(req: FastifyRequest, rep: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		gender: z.string(),
		birthDate: z.coerce.date(),
		address: z.string().optional(),
		phone: z.string().optional(),
		insuranceProvider: z.string().optional(),
		insurancePolicyNumber: z.string().optional(),
	});

	const {
		name,
		email,
		password,
		gender,
		birthDate,
		address,
		phone,
		insuranceProvider,
		insurancePolicyNumber,
	} = registerBodySchema.parse(req.body);

	try {
		const registerUseCase = makeRegisterUseCase();
		await registerUseCase.execute({
			name,
			email,
			password,
			gender,
			birthDate,
			address,
			phone,
			insuranceProvider,
			insurancePolicyNumber,
		});
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return rep.status(409).send();
		}

		if (
			err instanceof RoleNameInvalidError ||
			err instanceof GenderInvalidError
		) {
			return rep.status(400).send();
		}

		throw err;
	}

	return rep.status(201).send();
}
