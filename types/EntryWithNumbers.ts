import type { Entry } from "@/app/generated/prisma/client";

export type EntryWithNumbers = Omit<
	Entry,
	"investedAmount" | "returnAmount" | "fees"
> & {
	investedAmount: number;
	returnAmount: number;
	fees: number;
};
