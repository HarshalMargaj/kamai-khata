"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getTotalExpense(sheetId: string) {
	const { userId } = await auth();

	if (!userId) throw new Error("Unauthorized!");

	const { _sum } = await db.expense.aggregate({
		where: {
			sheetId,
			userId,
		},
		_sum: {
			amount: true,
		},
	});

	return _sum.amount ?? 0;
}
