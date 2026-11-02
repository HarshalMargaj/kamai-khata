"use server";

import { db } from "@/lib/db";
import { ensureUser } from "@/lib/ensureUser";

export async function createEntry(formData: FormData) {
	const userId = await ensureUser();

	const incomeSource = (formData.get("incomeSource") as string).trim();
	const date = formData.get("date") as string;
	const investedAmount = Number(formData.get("invested"));
	const returnAmount = Number(formData.get("returnAmount"));
	const fees = Number(formData.get("feeCut"));
	const sheetId = formData.get("sheetId") as string;

	if (!incomeSource || !date || !sheetId) {
		throw new Error("Missing required fields");
	}

	// ownership check
	const sheet = await db.sheet.findFirst({ where: { id: sheetId, userId } });

	if (!sheet) throw new Error("Sheet not found");

	await db.entry.create({
		data: {
			incomeSource,
			date: new Date(date),
			investedAmount,
			returnAmount,
			fees,
			userId,
			sheetId,
		},
	});
}
