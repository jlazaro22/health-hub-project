import { FastifyInstance } from 'fastify';
import { roles } from './roles';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';

export async function rolesRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get(
		'/roles',
		{
			onRequest: [verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR'])],
		},
		roles
	);
}
