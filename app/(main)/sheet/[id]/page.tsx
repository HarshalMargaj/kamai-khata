import TotolEarning from "@/components/sheet/TotolEarning";
import Table from "@/components/sheet/Table";
import React, { Suspense } from "react";
import ExpensesTable from "@/components/sheet/ExpensesTable";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const SheetContent = async ({ params }: PageProps) => {
	const { id } = await params;
	return (
		<div className="p-5 space-y-4 flex flex-col h-full overflow-auto scrollbar-thin scrollbar-thumb-green-500/10 scroll-smooth">
			<TotolEarning id={id} />
			<Table id={id} />
			<ExpensesTable />
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
