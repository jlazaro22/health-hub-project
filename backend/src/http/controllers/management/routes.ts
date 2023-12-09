import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createUser } from './users/create-user';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';
import { createSpecialty } from './specialties/create-specialty';
import { createMedicine } from './medicines/create-medicine';
import { searchPatients } from './patients/search-patients';
import { searchUsers } from './users/search-users';
import { assignDoctorSpecialty } from './doctor-specialties/assign-doctor-specialty';
import { createDoctorSchedule } from './doctor-schedules/create-doctor-schedule';
import { roles } from './roles/roles';
import { removeDoctorSchedule } from './doctor-schedules/remove-doctor-schedule';
import { createUserSchema, searchUsersSchema } from './routes-schemas';

export async function managementRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);
	app.addHook(
		'onRequest',
		verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR'])
	);

	app.post('/users', createUser);
	app.get('/users', searchUsers);
	app.get('/users/roles', roles);

	app.post('/doctors/:doctorId/assign-specialty', assignDoctorSpecialty);
	app.post('/doctors/:doctorId/add-schedule', createDoctorSchedule);
	app.delete('/doctors/:doctorId/:doctorScheduleId', removeDoctorSchedule);

	app.post('/specialties', createSpecialty);

	app.get('/patients', searchPatients);

	app.post('/create-medicine', createMedicine);
}
