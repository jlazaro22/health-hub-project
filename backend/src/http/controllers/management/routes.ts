import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';

export async function managementRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.post(
		'/create-user',
		{
			onRequest: [verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR'])],
		},
		createUser
	);
}
