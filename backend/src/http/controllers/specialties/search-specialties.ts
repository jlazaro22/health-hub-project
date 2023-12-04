import { makeSearchSpecialtiesUseCase } from '@/use-cases/factories/make-search-specialties-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function searchSpecialties(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const searchSpecialtiesQuerySchema = z.object({
		query: z.string().default(''),
		page: z.coerce.number().min(1).default(1),
	});

	const { query, page } = searchSpecialtiesQuerySchema.parse(req.query);

	try {
		const searchSpecialtiesUseCase = makeSearchSpecialtiesUseCase();
		const { specialties, totalPages } = await searchSpecialtiesUseCase.execute({
			query,
			page,
		});

		return rep.status(200).send({ specialties, page, totalPages });
	} catch (err) {
		throw err;
	}
}
