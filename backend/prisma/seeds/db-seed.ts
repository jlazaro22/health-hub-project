import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { faker, fakerPT_PT } from '@faker-js/faker';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function seeder() {
	// ? These default roles must exist in table 'roles' from the beginning: 'ADMINISTRADOR', 'COLABORADOR', 'MEDICO', 'PACIENTE' //

	const roleNames: string[] = [
		'ADMINISTRADOR',
		'COLABORADOR',
		'MEDICO',
		'PACIENTE',
	];

	await Promise.all(
		roleNames.map(async (name) => {
			await prisma.role.create({
				data: {
					name,
				},
			});
		})
	);

	// Register the superuser 'ADMINISTRADOR' role
	const adminRole = await prisma.role.findUnique({
		where: {
			name: 'ADMINISTRADOR',
		},
		select: {
			id: true,
		},
	});

	if (!adminRole) {
		console.error("⚠️ No 'ADMINISTRADOR' role in database");
		throw new Error("No 'ADMINISTRADOR' role in database");
	}

	const name = 'superuser';
	const email = 'superuser@example.com';
	const passwordHash = await hash('123456', 6);

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash: passwordHash,
			roleId: adminRole.id,
		},
	});

	// ? comment/un-comment the code bellow to seed or not 4 users for each role ('ADMINISTRADOR', 'COLABORADOR', 'MEDICO', 'PACIENTE') //
	// ? and 6 schedules to each doctor existent in the doctors table //

	// 	// seed 4 users with 'ADMINISTRADOR' role
	// 	const adminUserRole = await prisma.role.findUnique({
	// 		where: {
	// 			name: 'ADMINISTRADOR',
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});

	// 	if (!adminUserRole) {
	// 		console.error("⚠️ No 'ADMINISTRADOR' role in database");
	// 		throw new Error("No 'ADMINISTRADOR' role in database");
	// 	}

	// 	for (let i = 0; i < 4; i++) {
	// 		const firstName = fakerPT_PT.person.firstName();
	// 		const lastName = fakerPT_PT.person.lastName();
	// 		const name = `${firstName} ${lastName}`;
	// 		const email = faker.internet.exampleEmail({
	// 			firstName: firstName,
	// 			lastName: lastName,
	// 		});
	// 		const passwordHash = await hash('123456', 6);

	// 		await prisma.user.create({
	// 			data: {
	// 				name,
	// 				email,
	// 				passwordHash: passwordHash,
	// 				roleId: adminUserRole.id,
	// 			},
	// 		});
	// 	}

	// 	// seed 4 users with 'COLABORADOR' role
	// 	const employeeRole = await prisma.role.findUnique({
	// 		where: {
	// 			name: 'COLABORADOR',
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});

	// 	if (!employeeRole) {
	// 		console.error("⚠️ No 'COLABORADOR' role in database");
	// 		throw new Error("No 'COLABORADOR' role in database");
	// 	}

	// 	for (let i = 0; i < 4; i++) {
	// 		const firstName = fakerPT_PT.person.firstName();
	// 		const lastName = fakerPT_PT.person.lastName();
	// 		const name = `${firstName} ${lastName}`;
	// 		const email = faker.internet.exampleEmail({
	// 			firstName: firstName,
	// 			lastName: lastName,
	// 		});
	// 		const passwordHash = await hash('123456', 6);

	// 		await prisma.user.create({
	// 			data: {
	// 				name,
	// 				email,
	// 				passwordHash: passwordHash,
	// 				roleId: employeeRole.id,
	// 			},
	// 		});
	// 	}

	// 	// seed 4 users with 'MEDICO' role
	// 	const doctorRole = await prisma.role.findUnique({
	// 		where: {
	// 			name: 'MEDICO',
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});

	// 	if (!doctorRole) {
	// 		console.error("⚠️ No 'MEDICO' role in database");
	// 		throw new Error("No 'MEDICO' role in database");
	// 	}

	// 	for (let i = 0; i < 4; i++) {
	// 		const firstName = fakerPT_PT.person.firstName();
	// 		const lastName = fakerPT_PT.person.lastName();
	// 		const name = `${firstName} ${lastName}`;
	// 		const email = faker.internet.exampleEmail({
	// 			firstName: firstName,
	// 			lastName: lastName,
	// 		});
	// 		const passwordHash = await hash('123456', 6);
	// 		const photoUrl = faker.internet.avatar();
	// 		const birthDate = faker.date.birthdate({ min: 25, max: 67, mode: 'age' });
	// 		const phone = fakerPT_PT.phone.number();
	// 		const licenseNumber = faker.string.numeric(12);
	// 		const licenseExpiryDate = faker.date.future({ years: 10 });
	// 		const gender = faker.person.sex().toUpperCase();

	// 		if (gender !== 'MALE' && gender !== 'FEMALE') {
	// 			return;
	// 		}

	// 		await prisma.user.create({
	// 			data: {
	// 				name,
	// 				email,
	// 				passwordHash: passwordHash,
	// 				roleId: doctorRole.id,
	// 				doctors: {
	// 					create: {
	// 						gender,
	// 						photoUrl,
	// 						birthDate,
	// 						phone,
	// 						licenseNumber,
	// 						licenseExpiryDate,
	// 					},
	// 				},
	// 			},
	// 		});
	// 	}

	// 	// seed 6 schedules to each doctor
	// 	const doctors = await prisma.doctor.findMany();
	// 	const superuser = await prisma.user.findUnique({
	// 		where: {
	// 			email: 'superuser@example.com',
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});

	// 	if (!superuser) {
	// 		console.error("⚠️ No 'superuser' in database");
	// 		throw new Error("No 'superuser' in database");
	// 	}

	// 	await Promise.all(
	// 		doctors.map(async (doctor) => {
	// 			let isScheduled = false;

	// 			for (let i = 0; i < 6; i++) {
	// 				let fakerDate = faker.date.soon({ days: 7 });
	// 				fakerDate.setHours(i + 9, 0, 0, 0);
	// 				let date = dayjs(fakerDate).toDate();
	// 				let startTime = dayjs(fakerDate).toDate();
	// 				let endTime = dayjs(fakerDate).add(30, 'minute').toDate();

	// 				await prisma.doctorSchedule.create({
	// 					data: {
	// 						date,
	// 						startTime,
	// 						endTime,
	// 						isScheduled,
	// 						doctorId: doctor.id,
	// 						updatedBy: superuser.id,
	// 					},
	// 				});
	// 			}
	// 		})
	// 	);

	// 	// seed 4 users with 'PACIENTE' role
	// 	const patientRole = await prisma.role.findUnique({
	// 		where: {
	// 			name: 'PACIENTE',
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});

	// 	if (!patientRole) {
	// 		console.error("⚠️ No 'PACIENTE' role in database");
	// 		throw new Error("No 'PACIENTE' role in database");
	// 	}

	// 	for (let i = 0; i < 4; i++) {
	// 		const firstName = fakerPT_PT.person.firstName();
	// 		const lastName = fakerPT_PT.person.lastName();
	// 		const name = `${firstName} ${lastName}`;
	// 		const email = faker.internet.exampleEmail({
	// 			firstName: firstName,
	// 			lastName: lastName,
	// 		});
	// 		const passwordHash = await hash('123456', 6);
	// 		const birthDate = faker.date.birthdate({ min: 0, max: 85, mode: 'age' });
	// 		const address = `${fakerPT_PT.location.streetAddress(
	// 			true
	// 		)}, ${fakerPT_PT.location.zipCode()} - ${fakerPT_PT.location.city()}`;
	// 		const phone = fakerPT_PT.phone.number();
	// 		const insuranceProvider = fakerPT_PT.company.name();
	// 		const insurancePolicyNumber = faker.string.numeric(12);
	// 		const gender = faker.person.sex().toUpperCase();

	// 		if (gender !== 'MALE' && gender !== 'FEMALE') {
	// 			return;
	// 		}

	// 		await prisma.user.create({
	// 			data: {
	// 				name,
	// 				email,
	// 				passwordHash,
	// 				roleId: patientRole.id,
	// 				patients: {
	// 					create: {
	// 						gender,
	// 						birthDate,
	// 						address,
	// 						phone,
	// 						insuranceProvider,
	// 						insurancePolicyNumber,
	// 					},
	// 				},
	// 			},
	// 		});
	// 	}

	// ? End of comment/un-comment code //
}

seeder()
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
