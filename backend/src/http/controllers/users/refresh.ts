import { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(req: FastifyRequest, rep: FastifyReply) {
	await req.jwtVerify({ onlyCookie: true });

	const token = await rep.jwtSign(
		{ roleName: req.user.roleName },
		{
			sign: {
				sub: req.user.sub,
			},
		}
	);

	const refreshToken = await rep.jwtSign(
		{ roleName: req.user.roleName },
		{
			sign: {
				sub: req.user.sub,
				expiresIn: '20m',
			},
		}
	);

	return rep
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({
			token,
		});
}
