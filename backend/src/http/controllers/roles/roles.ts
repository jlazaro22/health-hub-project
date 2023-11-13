import { makeGetAllRolesUseCase } from '@/use-cases/factories/make-get-all-roles-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function roles(req: FastifyRequest, rep: FastifyReply) {
	const getAllRolesUseCase = makeGetAllRolesUseCase();

	const roles = await getAllRolesUseCase.execute();

	return rep.status(200).send({
		roles,
	});
}
