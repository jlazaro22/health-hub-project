import { makeSearchUsersUseCase } from '@/use-cases/factories/make-search-users-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function searchUsers(req: FastifyRequest, rep: FastifyReply) {
	const searchUsersQuerySchema = z.object({
		query: z.string().default(''),
		page: z.coerce.number().min(1).default(1),
	});

	const { query, page } = searchUsersQuerySchema.parse(req.query);

	try {
		const searchUsersUseCase = makeSearchUsersUseCase();
		const { users, totalPages } = await searchUsersUseCase.execute({
			query,
			page,
		});

		return rep.status(200).send({ users, page, totalPages });
	} catch (err) {
		throw err;
	}
}
