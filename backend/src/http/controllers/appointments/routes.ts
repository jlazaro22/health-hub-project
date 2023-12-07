import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createAppointment } from './create-appointment';
import { createPrescription } from './create-prescription';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';
import { cancelAppointment } from './cancel-appointment';

export async function appointmentsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.post(
		'/appointments',
		{
			onRequest: [
				verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR', 'PACIENTE']),
			],
		},
		createAppointment
	);
	app.delete(
		'/appointments/:appointmentNumber/:appointmentDoctorId',
		{
			onRequest: [
				verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR', 'PACIENTE']),
			],
		},
		cancelAppointment
	);

	app.post(
		'/appointments/:appointmentNumber/:appointmentDoctorId/prescriptions',
		{ onRequest: [verifyLoggedUserRole(['MEDICO'])] },
		createPrescription
	);
}
