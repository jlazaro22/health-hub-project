import { UsersRepository } from '@/repositories/users-repository';
import { Patient } from '@prisma/client';

interface getAllPatientsUseCaseResponse {
	patients: Patient[] | null;
}

export class GetAllPatientsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(): Promise<getAllPatientsUseCaseResponse> {
		const patients = await this.usersRepository.getAllPatients();

		return { patients };
	}
}
