import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { makeGetRoleUseCase } from '@/use-cases/factories/make-get-role-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(req.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();
		const { user } = await authenticateUseCase.execute({ email, password });

		const getRoleUseCase = makeGetRoleUseCase();
		const { role } = await getRoleUseCase.execute({ id: user.roleId });

		const token = await rep.jwtSign(
			{
				roleName: role.name,
			},
			{
				sign: {
					sub: user.id,
				},
			}
		);

		const refreshToken = await rep.jwtSign(
			{
				roleName: role.name,
			},
			{
				sign: {
					sub: user.id,
					expiresIn: '20m',
				},
			}
		);

		return rep
			.status(200)
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.send({ token });
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return rep.status(401).send({ message: err.message });
		}

		throw err;
	}
}
