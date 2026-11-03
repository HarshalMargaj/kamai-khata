"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function deleteSheet(sheetId: string) {
	const { userId } = await auth();

	if (!userId) throw new Error("Unauthorized!");

	await db.sheet.delete({
		where: {
			id: sheetId,
			userId,
		},
	});
}
