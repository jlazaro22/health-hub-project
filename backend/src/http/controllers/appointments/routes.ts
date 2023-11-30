import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createAppointment } from './create-appointment';
import { createPrescription } from './create-prescription';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';

export async function appointmentsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.post('/appointments', createAppointment);
	app.post(
		'/appointments/:appointmentNumber/:appointmentDoctorId/prescriptions',
		{ onRequest: [verifyLoggedUserRole(['MEDICO'])] },
		createPrescription
	);
}
