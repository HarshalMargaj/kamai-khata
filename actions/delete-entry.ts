"use server";

import { db } from "@/lib/db";

export async function deleteEntry(entryId: string) {
	await db.entry.delete({
		where: {
			id: entryId,
		},
	});
}
