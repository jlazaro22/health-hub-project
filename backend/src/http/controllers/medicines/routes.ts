import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';
import { FastifyInstance } from 'fastify';
import { searchMedicines } from './search-medicines';

export async function medicinesRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);
	app.addHook(
		'onRequest',
		verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR', 'MEDICO'])
	);

	app.get('/medicines', searchMedicines);
}
