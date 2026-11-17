"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function updateExpense({
	id,
	formData,
}: {
	id: string;
	formData: FormData;
}) {
	const title = formData.get("title") as string;
	const date = formData.get("date") as string;
	const amount = Number(formData.get("amount"));
	const { userId } = await auth();

	if (!userId) throw new Error("Unauthorized!");

	await db.expense.update({
		where: {
			id,
			userId,
		},
		data: {
			title,
			date: new Date(date),
			amount,
		},
	});
}
