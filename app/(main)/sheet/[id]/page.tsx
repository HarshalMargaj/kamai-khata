import TotolEarning from "@/components/sheet/TotolEarning";
import Table from "@/components/sheet/Table";
import React, { Suspense } from "react";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const SheetContent = async ({ params }: PageProps) => {
	const { id } = await params;
	return (
		<div className="p-5 space-y-4">
			<TotolEarning id={id} />
			<Table id={id} />
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
