"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getExpenses(sheetId: string) {
	const { userId } = await auth();

	if (!userId) throw new Error("Unauthorized!");

	const response = await db.expense.findMany({
		where: {
			sheetId,
			userId,
		},
	});

	return response;
}
