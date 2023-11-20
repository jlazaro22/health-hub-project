import { makeGetAllUsersUseCase } from '@/use-cases/factories/make-get-all-users-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllUsers(req: FastifyRequest, rep: FastifyReply) {
	try {
		const getAllUsersUseCase = makeGetAllUsersUseCase();
		const users = await getAllUsersUseCase.execute();

		return rep.status(200).send(users);
	} catch (err) {
		throw err;
	}
}
