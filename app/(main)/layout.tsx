import Sidebar from "@/components/sidebar/Sidebar";
import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen">
			<Suspense
				fallback={
					<div className="w-75 border-r border-stone-700 h-full" />
				}
			>
				<Sidebar />
			</Suspense>
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default layout;
