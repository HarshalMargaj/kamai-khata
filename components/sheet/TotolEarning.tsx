"use client";

import { getTotalProfit } from "@/actions/get-total-profit";
import { useQuery } from "@tanstack/react-query";
import { Goal } from "lucide-react";
import React from "react";

interface TotolEarningProps {
	id: string;
}

const TotolEarning = ({ id }: TotolEarningProps) => {
	const { data: total = 0, isLoading } = useQuery({
		queryKey: ["entries", "total", id],
		queryFn: () => getTotalProfit(id),
	});

	const progress = (total / 100000) * 100;

	return (
		<div className="border border-stone-900 rounded-lg p-5 flex items-center justify-between">
			<div className="space-y-2">
				<div className="text-green-100">Total Earning</div>
				<div className="text-green-500 font-bold text-6xl">
					{isLoading ? "..." : `₹${total.toLocaleString("en-IN")}`}
				</div>
			</div>
			<div className="space-y-2">
				<div className="text-green-100 ml-10 flex items-center gap-2">
					<Goal />
					Goal
				</div>
				<div className="text-green-100 flex items-center gap-4 w-120">
					<div className="text-4xl font-bold">0</div>
					<div className="border border-stone-900 p-2 rounded-2xl w-full">
						<div
							style={{ width: `${progress.toFixed(2)}%` }}
							className={`bg-green-600 h-15 rounded-lg flex items-center justify-center text-stone-900 font-bold`}
						>
							{progress.toFixed(2)}%
						</div>
					</div>
					<div className="font-bold text-4xl">1L</div>
				</div>
			</div>
		</div>
	);
};

export default TotolEarning;
