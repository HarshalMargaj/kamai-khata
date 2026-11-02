import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function ensureUser() {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized!");

	await db.user.upsert({
		where: { userId },
		update: {},
		create: { userId },
	});

	return userId;
}
