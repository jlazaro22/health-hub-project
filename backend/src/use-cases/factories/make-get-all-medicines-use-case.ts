import { PrismaMedicinesRepository } from '@/repositories/prisma/prisma-medicines-repository';
import { GetAllMedicinesUseCase } from '../medicines/get-all-medicines';

export function makeGetAllMedicinesUseCase() {
	const medicinesRepository = new PrismaMedicinesRepository();
	const getAllMedicinesUseCase = new GetAllMedicinesUseCase(
		medicinesRepository
	);

	return getAllMedicinesUseCase;
}
