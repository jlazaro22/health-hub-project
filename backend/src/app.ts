import fastify from 'fastify';
import { usersRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { rolesRoutes } from './http/controllers/roles/routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: { expiresIn: '10m' },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(rolesRoutes);

app.setErrorHandler((err, _, rep) => {
	if (err instanceof ZodError) {
		return rep.status(400).send({
			message: 'Validation error.',
			issues: err.format(),
		});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(err);
	}

	return rep.status(500).send({ message: 'Internal Server Error' });
});
