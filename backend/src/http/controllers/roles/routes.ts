import { FastifyInstance } from 'fastify';
import { roles } from './roles';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function rolesRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get(
		'/roles',
		{
			onRequest: [verifyUserRole(['ADMINISTRADOR', 'COLABORADOR'])],
		},
		roles
	);
}
