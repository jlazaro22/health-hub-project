import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createUser } from './users/create-user';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';
import { createSpecialty } from './specialties/create-specialty';
import { createMedicine } from './medicines/create-medicine';
import { getAllDoctors } from './users/get-all-doctors';
import { getAllPatients } from './users/get-all-patients';
import { getAllUsers } from './users/get-all-users';
import { assignDoctorSpecialty } from './doctor-specialties/assign-doctor-specialty';
import { getAllSpecialties } from './specialties/get-all-specialties';
import { getDoctorSpecialties } from './doctor-specialties/get-doctor-specialties';
import { createDoctorSchedule } from './doctor-schedules/create-doctor-schedule';
import { getDoctorSchedules } from './doctor-schedules/get-doctor-schedules';

export async function managementRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);
	app.addHook(
		'onRequest',
		verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR'])
	);

	app.post('/create-user', createUser);
	app.get('/users', getAllUsers);

	app.get('/doctors', getAllDoctors);
	app.post('/doctors/:doctorId/doctor-specialty', assignDoctorSpecialty);
	app.get('/doctors/:doctorId/doctor-specialties', getDoctorSpecialties);
	app.post('/doctors/:doctorId/doctor-schedule', createDoctorSchedule);
	app.get('/doctors/:doctorId/doctor-schedules', getDoctorSchedules);

	app.post('/create-specialty', createSpecialty);
	app.get('/specialties', getAllSpecialties);

	app.get('/patients', getAllPatients);

	app.post('/create-medicine', createMedicine);
}
