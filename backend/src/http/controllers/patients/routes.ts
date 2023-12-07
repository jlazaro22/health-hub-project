import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';
import { FastifyInstance } from 'fastify';
import { getPatientAppointments } from './get-patient-appointments';

export async function patientsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get(
		'/patients/appointments',
		{
			onRequest: [
				verifyLoggedUserRole([
					'ADMINISTRADOR',
					'COLABORADOR',
					'MEDICO',
					'PACIENTE',
				]),
			],
		},
		getPatientAppointments
	);
}
