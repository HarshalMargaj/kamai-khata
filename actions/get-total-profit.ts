// actions/get-total-profit.ts
"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getTotalProfit(sheetId: string) {
	const { userId } = await auth();
	if (!userId) return 0;

	const { _sum } = await db.entry.aggregate({
		where: { sheetId, userId },
		_sum: {
			investedAmount: true,
			returnAmount: true,
			fees: true,
		},
	});

	const total =
		(_sum.returnAmount?.toNumber() ?? 0) -
		(_sum.investedAmount?.toNumber() ?? 0) -
		(_sum.fees?.toNumber() ?? 0);

	return Math.round(total * 100) / 100;
}
