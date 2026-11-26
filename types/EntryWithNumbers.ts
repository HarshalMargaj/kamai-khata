import type { Earning } from "@/app/generated/prisma/client";

export type EntryWithNumbers = Omit<
	Earning,
	"investedAmount" | "returnAmount" | "fees"
> & {
	investedAmount: number;
	returnAmount: number;
	fees: number;
};
