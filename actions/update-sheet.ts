"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function updateSheet({
	sheetId,
	sheetName,
}: {
	sheetId: string;
	sheetName: string;
}) {
	const { userId } = await auth();

	if (!userId) throw new Error("Unauthorized!");

	await db.sheet.update({
		where: {
			id: sheetId,
			userId,
		},
		data: {
			name: sheetName,
		},
	});
}
