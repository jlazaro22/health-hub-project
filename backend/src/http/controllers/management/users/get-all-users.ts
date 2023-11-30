import { makeGetAllUsersUseCase } from '@/use-cases/factories/make-get-all-users-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getAllUsers(req: FastifyRequest, rep: FastifyReply) {
	const getAllUsersQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = getAllUsersQuerySchema.parse(req.query);

	try {
		const getAllUsersUseCase = makeGetAllUsersUseCase();
		const { users, totalPages } = await getAllUsersUseCase.execute({
			page,
		});

		return rep.status(200).send({ users, page, totalPages });
	} catch (err) {
		throw err;
	}
}
