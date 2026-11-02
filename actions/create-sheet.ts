"use server";

import { db } from "@/lib/db";

export async function CreateSheet(name: string) {
	await db.sheet.create({
		data: {
			name,
		},
	});
}
