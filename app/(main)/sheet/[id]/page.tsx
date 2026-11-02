import TotolEarning from "@/components/sheet/TotolEarning";
import React, { Suspense } from "react";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const SheetContent = async ({ params }: PageProps) => {
	const { id } = await params;
	return (
		<div>
			<TotolEarning />
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
