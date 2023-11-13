import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(req: FastifyRequest, rep: FastifyReply) {
	const getUserProfileUseCase = makeGetUserProfileUseCase();
	const { user } = await getUserProfileUseCase.execute({
		userId: req.user.sub,
	});

	return rep.status(200).send({
		user: {
			...user,
			passwordHash: undefined,
		},
	});
}
