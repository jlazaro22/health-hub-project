import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(rolesToVerify: string[]) {
	return async (req: FastifyRequest, rep: FastifyReply) => {
		const { roleName } = req.user;

		if (!rolesToVerify.includes(roleName)) {
			return rep.status(403).send({ message: 'Forbidden' });
		}
	};
}
