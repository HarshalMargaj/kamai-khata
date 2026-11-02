"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getEntries(sheetId: string) {
	const { userId } = await auth();
	if (!userId) return [];

	const entries = await db.entry.findMany({
		where: { sheetId, userId },
		orderBy: { date: "desc" },
	});

	return entries.map(e => ({
		...e,
		investedAmount: e.investedAmount.toNumber(),
		returnAmount: e.returnAmount.toNumber(),
		fees: e.fees.toNumber(),
	}));
}
