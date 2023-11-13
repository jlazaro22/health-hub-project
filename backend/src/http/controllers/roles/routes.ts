import { FastifyInstance } from 'fastify';
import { roles } from './roles';
import { verifyJwt } from '@/http/middlewares/verify-jwt';

export async function rolesRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get('/roles', roles);
}
