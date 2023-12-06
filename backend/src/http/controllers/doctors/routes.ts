import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { searchDoctors } from './search-doctors';
import { getDoctorSpecialties } from './get-doctor-specialties';
import { getDoctorSchedules } from './get-doctor-schedules';
import { getDoctorAppointments } from './get-doctor-apointments';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';

export async function doctorsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get('/doctors', searchDoctors);
	app.get('/doctors/:doctorId/specialties', getDoctorSpecialties);
	app.get('/doctors/:doctorId/schedules', getDoctorSchedules);
	app.get(
		'/doctors/appointments',
		{
			onRequest: [
				verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR', 'MEDICO']),
			],
		},
		getDoctorAppointments
	);
}
