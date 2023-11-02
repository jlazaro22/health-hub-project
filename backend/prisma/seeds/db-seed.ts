import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { faker, fakerPT_PT } from '@faker-js/faker';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function seeder() {
	// ? These default profiles must exist in table 'profiles' from the beginning: 'ADMINISTRADOR', 'COLABORADOR', 'MEDICO', 'PACIENTE' //

	const profileNames: string[] = [
		'ADMINISTRADOR',
		'COLABORADOR',
		'MEDICO',
		'PACIENTE',
	];

	await Promise.all(
		profileNames.map(async (name) => {
			await prisma.profile.create({
				data: {
					name,
				},
			});
		})
	);

	// Register the superuser 'ADMINISTRADOR' profile
	const adminProfile = await prisma.profile.findUnique({
		where: {
			name: 'ADMINISTRADOR',
		},
		select: {
			id: true,
		},
	});

	if (!adminProfile) {
		console.error("⚠️ No 'ADMINISTRADOR' profile in database");
		throw new Error("No 'ADMINISTRADOR' profile in database");
	}

	const name = 'superuser';
	const email = 'superuser@example.com';
	const passwordHash = await hash('123456', 6);

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash: passwordHash,
			profileId: adminProfile.id,
		},
	});

	// ? comment/un-comment to seed or not the other tables //

	// // seed 4 users with 'ADMINISTRADOR' profile
	// const adminProfile = await prisma.profile.findUnique({
	// 	where: {
	// 		name: 'ADMINISTRADOR',
	// 	},
	// 	select: {
	// 		id: true,
	// 	},
	// });

	// if (!adminProfile) {
	// 	console.error("⚠️ No 'ADMINISTRADOR' profile in database");
	// 	throw new Error("No 'ADMINISTRADOR' profile in database");
	// }

	// for (let i = 0; i < 4; i++) {
	// 	const firstName = fakerPT_PT.person.firstName();
	// 	const lastName = fakerPT_PT.person.lastName();
	// 	const name = `${firstName} ${lastName}`;
	// 	const email = faker.internet.exampleEmail({
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 	});
	// 	const passwordHash = await hash('123456', 6);

	// 	await prisma.user.create({
	// 		data: {
	// 			name,
	// 			email,
	// 			passwordHash: passwordHash,
	// 			profileId: adminProfile.id,
	// 		},
	// 	});
	// }

	// // seed 4 users with 'COLABORADOR' profile
	// const employeeProfile = await prisma.profile.findUnique({
	// 	where: {
	// 		name: 'COLABORADOR',
	// 	},
	// 	select: {
	// 		id: true,
	// 	},
	// });

	// if (!employeeProfile) {
	// 	console.error("⚠️ No 'COLABORADOR' profile in database");
	// 	throw new Error("No 'COLABORADOR' profile in database");
	// }

	// for (let i = 0; i < 4; i++) {
	// 	const firstName = fakerPT_PT.person.firstName();
	// 	const lastName = fakerPT_PT.person.lastName();
	// 	const name = `${firstName} ${lastName}`;
	// 	const email = faker.internet.exampleEmail({
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 	});
	// 	const passwordHash = await hash('123456', 6);

	// 	await prisma.user.create({
	// 		data: {
	// 			name,
	// 			email,
	// 			passwordHash: passwordHash,
	// 			profileId: employeeProfile.id,
	// 		},
	// 	});
	// }

	// // seed 4 users with 'MEDICO' profile
	// const doctorProfile = await prisma.profile.findUnique({
	// 	where: {
	// 		name: 'MEDICO',
	// 	},
	// 	select: {
	// 		id: true,
	// 	},
	// });

	// if (!doctorProfile) {
	// 	console.error("⚠️ No 'MEDICO' profile in database");
	// 	throw new Error("No 'MEDICO' profile in database");
	// }

	// for (let i = 0; i < 4; i++) {
	// 	const firstName = fakerPT_PT.person.firstName();
	// 	const lastName = fakerPT_PT.person.lastName();
	// 	const name = `${firstName} ${lastName}`;
	// 	const email = faker.internet.exampleEmail({
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 	});
	// 	const passwordHash = await hash('123456', 6);
	// 	const photoUrl = faker.internet.avatar();
	// 	const birthDate = faker.date.birthdate({ min: 25, max: 67, mode: 'age' });
	// 	const phone = fakerPT_PT.phone.number();
	// 	const licenseNumber = faker.string.numeric(12);
	// 	const licenseExpiryDate = faker.date.future({ years: 10 });
	// 	const gender = faker.person.sex().toUpperCase();

	// 	if (gender !== 'MALE' && gender !== 'FEMALE') {
	// 		return;
	// 	}

	// 	await prisma.user.create({
	// 		data: {
	// 			name,
	// 			email,
	// 			passwordHash: passwordHash,
	// 			profileId: doctorProfile.id,
	// 			doctors: {
	// 				create: {
	// 					gender,
	// 					photoUrl,
	// 					birthDate,
	// 					phone,
	// 					licenseNumber,
	// 					licenseExpiryDate,
	// 				},
	// 			},
	// 		},
	// 	});
	// }

	// // seed 6 schedules to each doctor
	// const doctors = await prisma.doctor.findMany();

	// await Promise.all(
	// 	doctors.map(async (doctor) => {
	// 		let isScheduled = false;

	// 		for (let i = 0; i < 6; i++) {
	// 			let fakerDate = faker.date.soon({ days: 7 });
	// 			fakerDate.setHours(i + 9, 0, 0, 0);
	// 			let date = dayjs(fakerDate).toDate();
	// 			let startTime = dayjs(fakerDate).toDate();
	// 			let endTime = dayjs(fakerDate).add(30, 'minute').toDate();

	// 			await prisma.doctorSchedule.create({
	// 				data: {
	// 					date,
	// 					startTime,
	// 					endTime,
	// 					isScheduled,
	// 					doctorId: doctor.id,
	// 				},
	// 			});
	// 		}
	// 	})
	// );

	// // seed 4 users with 'PACIENTE' profile
	// const patientProfile = await prisma.profile.findUnique({
	// 	where: {
	// 		name: 'PACIENTE',
	// 	},
	// 	select: {
	// 		id: true,
	// 	},
	// });

	// if (!patientProfile) {
	// 	console.error("⚠️ No 'PACIENTE' profile in database");
	// 	throw new Error("No 'PACIENTE' profile in database");
	// }

	// for (let i = 0; i < 4; i++) {
	// 	const firstName = fakerPT_PT.person.firstName();
	// 	const lastName = fakerPT_PT.person.lastName();
	// 	const name = `${firstName} ${lastName}`;
	// 	const email = faker.internet.exampleEmail({
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 	});
	// 	const passwordHash = await hash('123456', 6);
	// 	const birthDate = faker.date.birthdate({ min: 0, max: 85, mode: 'age' });
	// 	const address = `${fakerPT_PT.location.streetAddress(
	// 		true
	// 	)}, ${fakerPT_PT.location.zipCode()} - ${fakerPT_PT.location.city()}`;
	// 	const phone = fakerPT_PT.phone.number();
	// 	const insuranceProvider = fakerPT_PT.company.name();
	// 	const insurance_policy_number = faker.string.numeric(12);
	// 	const gender = faker.person.sex().toUpperCase();

	// 	if (gender !== 'MALE' && gender !== 'FEMALE') {
	// 		return;
	// 	}

	// 	await prisma.user.create({
	// 		data: {
	// 			name,
	// 			email,
	// 			passwordHash,
	// 			profileId: patientProfile.id,
	// 			patients: {
	// 				create: {
	// 					gender,
	// 					birthDate,
	// 					address,
	// 					phone,
	// 					insuranceProvider,
	// 					insurance_policy_number,
	// 				},
	// 			},
	// 		},
	// 	});
	// }
}

seeder()
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
