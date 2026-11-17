"use server";

import { db } from "@/lib/db";

export async function deleteExpense(id: string) {
	await db.expense.delete({
		where: {
			id,
		},
	});
}
