"use server";

import { db } from "@/lib/db";

export async function deleteEntry(entryId: string) {
	await db.earning.delete({
		where: {
			id: entryId,
		},
	});
}
