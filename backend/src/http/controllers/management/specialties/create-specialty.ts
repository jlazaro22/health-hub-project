import { SpecialtyAlreadyExistsError } from '@/use-cases/errors/specialty-already-exists-error';
import { makeCreateSpecialtyUseCase } from '@/use-cases/factories/make-create-specialty-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function createSpecialty(req: FastifyRequest, rep: FastifyReply) {
	const createSpecialtyBodySchema = z.object({
		name: z.string(),
		description: z.string(),
	});

	const { name, description } = createSpecialtyBodySchema.parse(req.body);

	try {
		const createSpecialtyUseCase = makeCreateSpecialtyUseCase();
		await createSpecialtyUseCase.execute({
			name,
			description,
		});
	} catch (err) {
		if (err instanceof SpecialtyAlreadyExistsError) {
			return rep.status(409).send();
		}

		throw err;
	}

	return rep.status(201).send();
}
