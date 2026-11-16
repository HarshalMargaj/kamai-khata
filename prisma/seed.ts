import { db } from "@/lib/db";
import earnings from "./earnings.json";

async function main() {
	console.log("Starting database seeding...");

	// Bulk create earnings
	const result = await db.earning.createMany({
		data: earnings.map(item => ({
			...item,
			date: new Date(item.date.replace(" ", "T") + "Z"),
			createdAt: new Date(item.createdAt.replace(" ", "T") + "Z"),
			updatedAt: new Date(item.updatedAt.replace(" ", "T") + "Z"),
		})),
	});

	console.log(`Earnings created: ${result.count}`);

	console.log("Seeding completed!");
}

main()
	.catch(error => {
		console.error("Seeding failed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
