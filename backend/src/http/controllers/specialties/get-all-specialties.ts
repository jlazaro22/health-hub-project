import { makeGetAllSpecialtiesUseCase } from '@/use-cases/factories/make-get-all-specialties-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getAllSpecialties(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const getAllSpecialtiesQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = getAllSpecialtiesQuerySchema.parse(req.query);

	try {
		const getAllSpecialtiesUseCase = makeGetAllSpecialtiesUseCase();
		const { specialties, totalPages } = await getAllSpecialtiesUseCase.execute({
			page,
		});

		return rep.status(200).send({ specialties, page, totalPages });
	} catch (err) {
		throw err;
	}
}
