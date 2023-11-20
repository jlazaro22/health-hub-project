import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { refresh } from './refresh';
import { logout } from './logout';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/signup', register);
	app.post('/signin', authenticate);
	app.post('/logout', logout);
	app.patch('/token/refresh', refresh);
	app.get('/account', { onRequest: [verifyJwt] }, profile);
}
