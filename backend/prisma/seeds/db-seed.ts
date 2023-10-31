import { PrismaClient } from '@prisma/client';
import { faker, fakerPT_PT } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function seeder() {
	// * These default profiles must exist in table 'profiles' from the beginning: 'ADMIN', 'EMPLOYEE', 'DOCTOR', 'PATIENT' //

	const profileNames: string[] = ['ADMIN', 'EMPLOYEE', 'DOCTOR', 'PATIENT'];

	await Promise.all(
		profileNames.map(async (name) => {
			await prisma.profile.create({
				data: {
					name,
				},
			});
		})
	);

	// * comment/un-comment to seed or not the other tables //

	// seed 4 users with 'ADMIN' profile
	const adminProfile = await prisma.profile.findUnique({
		where: {
			name: 'ADMIN',
		},
		select: {
			id: true,
		},
	});

	if (!adminProfile) {
		console.error("⚠️ No 'ADMIN' profile in database");
		throw new Error("No 'ADMIN' profile in database");
	}

	for (let i = 0; i < 4; i++) {
		const firstName = fakerPT_PT.person.firstName();
		const lastName = fakerPT_PT.person.lastName();
		const name = `${firstName} ${lastName}`;
		const email = faker.internet.exampleEmail({
			firstName: firstName,
			lastName: lastName,
		});
		const passwordHash = await hash('123456', 6);

		await prisma.user.create({
			data: {
				name,
				email,
				passwordHash: passwordHash,
				profileId: adminProfile.id,
			},
		});
	}

	// seed 4 users with 'EMPLOYEE' profile
	const employeeProfile = await prisma.profile.findUnique({
		where: {
			name: 'EMPLOYEE',
		},
		select: {
			id: true,
		},
	});

	if (!employeeProfile) {
		console.error("⚠️ No 'EMPLOYEE' profile in database");
		throw new Error("No 'EMPLOYEE' profile in database");
	}

	for (let i = 0; i < 4; i++) {
		const firstName = fakerPT_PT.person.firstName();
		const lastName = fakerPT_PT.person.lastName();
		const name = `${firstName} ${lastName}`;
		const email = faker.internet.exampleEmail({
			firstName: firstName,
			lastName: lastName,
		});
		const passwordHash = await hash('123456', 6);

		await prisma.user.create({
			data: {
				name,
				email,
				passwordHash: passwordHash,
				profileId: employeeProfile.id,
			},
		});
	}

	// seed 4 users with 'DOCTOR' profile
	const doctorProfile = await prisma.profile.findUnique({
		where: {
			name: 'DOCTOR',
		},
		select: {
			id: true,
		},
	});

	if (!doctorProfile) {
		console.error("⚠️ No 'DOCTOR' profile in database");
		throw new Error("No 'DOCTOR' profile in database");
	}

	for (let i = 0; i < 4; i++) {
		const firstName = fakerPT_PT.person.firstName();
		const lastName = fakerPT_PT.person.lastName();
		const name = `${firstName} ${lastName}`;
		const email = faker.internet.exampleEmail({
			firstName: firstName,
			lastName: lastName,
		});
		const passwordHash = await hash('123456', 6);
		const photoUrl = faker.internet.avatar();
		const birthDate = faker.date.birthdate({ min: 25, max: 67, mode: 'age' });
		const phone = fakerPT_PT.phone.number();
		const licenseNumber = faker.string.numeric(12);
		const licenseExpiryDate = faker.date.future({ years: 10 });
		const gender = faker.person.sex().toUpperCase();

		if (gender !== 'MALE' && gender !== 'FEMALE') {
			return;
		}

		await prisma.user.create({
			data: {
				name,
				email,
				passwordHash: passwordHash,
				profileId: doctorProfile.id,
				doctors: {
					create: {
						gender,
						photoUrl,
						birthDate,
						phone,
						licenseNumber,
						licenseExpiryDate,
					},
				},
			},
		});
	}

	// seed 6 schedules to each doctor
	const doctors = await prisma.doctor.findMany();

	await Promise.all(
		doctors.map(async (doctor) => {
			let isScheduled = false;

			for (let i = 0; i < 6; i++) {
				let fakerDate = faker.date.soon({ days: 7 });
				fakerDate.setHours(i + 9, 0, 0, 0);
				let date = dayjs(fakerDate).toDate();
				let startTime = dayjs(fakerDate).toDate();
				let endTime = dayjs(fakerDate).add(30, 'minute').toDate();
				isScheduled = !isScheduled;

				await prisma.doctorSchedule.create({
					data: {
						date,
						startTime,
						endTime,
						isScheduled,
						doctorId: doctor.id,
					},
				});
			}
		})
	);

	// seed 4 users with 'PATIENT' profile
	const patientProfile = await prisma.profile.findUnique({
		where: {
			name: 'PATIENT',
		},
		select: {
			id: true,
		},
	});

	if (!patientProfile) {
		console.error("⚠️ No 'PATIENT' profile in database");
		throw new Error("No 'PATIENT' profile in database");
	}

	for (let i = 0; i < 4; i++) {
		const firstName = fakerPT_PT.person.firstName();
		const lastName = fakerPT_PT.person.lastName();
		const name = `${firstName} ${lastName}`;
		const email = faker.internet.exampleEmail({
			firstName: firstName,
			lastName: lastName,
		});
		const passwordHash = await hash('123456', 6);
		const birthDate = faker.date.birthdate({ min: 0, max: 85, mode: 'age' });
		const address = `${fakerPT_PT.location.streetAddress(
			true
		)}, ${fakerPT_PT.location.zipCode()} - ${fakerPT_PT.location.city()}`;
		const phone = fakerPT_PT.phone.number();
		const insuranceProvider = fakerPT_PT.company.name();
		const insurance_policy_number = faker.string.numeric(12);
		const gender = faker.person.sex().toUpperCase();

		if (gender !== 'MALE' && gender !== 'FEMALE') {
			return;
		}

		await prisma.user.create({
			data: {
				name,
				email,
				passwordHash,
				profileId: patientProfile.id,
				patients: {
					create: {
						gender,
						birthDate,
						address,
						phone,
						insuranceProvider,
						insurance_policy_number,
					},
				},
			},
		});
	}
}

seeder()
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
