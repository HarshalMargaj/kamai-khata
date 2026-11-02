"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getSheets() {
	const { userId } = await auth();

	if (!userId) return [];

	const sheets = await db.sheet.findMany({
		where: {
			userId,
		},
	});

	return sheets;
}
