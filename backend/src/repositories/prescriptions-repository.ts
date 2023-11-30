import { MedicinesOnAppointments, Prisma } from '@prisma/client';

export interface PrescriptionsRepository {
	create(
		data: Prisma.MedicinesOnAppointmentsUncheckedCreateInput
	): Promise<MedicinesOnAppointments>;
}
