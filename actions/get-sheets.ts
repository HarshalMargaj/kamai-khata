"use server";

import { db } from "@/lib/db";

export async function getSheets() {
	const sheets = await db.sheet.findMany({});

	return sheets;
}
