import { FastifyReply, FastifyRequest } from 'fastify';

export async function logout(req: FastifyRequest, rep: FastifyReply) {
	return rep.setCookie('refreshToken', '').status(200).send();
}
