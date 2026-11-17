import TotolEarning from "@/components/sheet/TotolEarning";
import Table from "@/components/sheet/Table";
import React, { Suspense } from "react";
import ExpensesTable from "@/components/sheet/ExpensesTable";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const SheetContent = async ({ params }: PageProps) => {
	const { id } = await params;

	const sheet = await db.sheet.findFirst({ where: { id } });

	if (!sheet) notFound();

	return (
		<div className="p-5 space-y-4 flex flex-col h-full overflow-auto scrollbar-thin scrollbar-thumb-green-500/10 scroll-smooth">
			<TotolEarning id={id} />
			<div>
				<Table id={id} />
				<ExpensesTable id={id} />
			</div>
		</div>
	);
};

const page = async ({ params }: PageProps) => {
	return (
		<Suspense fallback={<div className="p-5">Loading...</div>}>
			<SheetContent params={params} />
		</Suspense>
	);
};

export default page;
