"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function updateEntry(formData: FormData) {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	const incomeSource = formData.get("incomeSource");
	const investedAmount = Number(formData.get("invested"));
	const returnAmount = Number(formData.get("returnAmount"));
	const fees = Number(formData.get("feeCut") || 0);
	const entryId = formData.get("entryId");
	const date = formData.get("date");

	if (
		typeof entryId !== "string" ||
		typeof incomeSource !== "string" ||
		typeof date !== "string"
	) {
		throw new Error("Invalid data");
	}

	if (
		[investedAmount, returnAmount, fees].some(n => Number.isNaN(n) || n < 0)
	) {
		throw new Error("Invalid amount");
	}

	await db.entry.update({
		where: {
			id: entryId,
			userId,
		},
		data: {
			incomeSource,
			investedAmount,
			returnAmount,
			fees,
			date: new Date(date),
		},
	});
}
