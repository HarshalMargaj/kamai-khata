"use server";

import { db } from "@/lib/db";
import { ensureUser } from "@/lib/ensureUser";

export async function CreateSheet(name: string) {
	const userId = await ensureUser();

	if (!name) {
		throw new Error("Sheet name is required.");
	}

	await db.sheet.create({
		data: {
			name,
			userId,
		},
	});
}
