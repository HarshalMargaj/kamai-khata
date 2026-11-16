"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function createExpense(formData: FormData) {
	const title = formData.get("title") as string;
	const date = formData.get("date") as string;
	const amount = Number(formData.get("amount"));
	console.log(title, date, amount);
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized!");
	}

	if (!title || !date || !amount) {
		throw new Error("All fields are required");
	}

	await db.expense.create({
		data: {
			title: title.trim(),
			date: new Date(date),
			amount,
			userId,
		},
	});
}
