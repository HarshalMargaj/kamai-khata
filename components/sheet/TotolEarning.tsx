"use client";

import { getTotalProfit } from "@/actions/get-total-profit";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface TotolEarningProps {
	id: string;
}

const TotolEarning = ({ id }: TotolEarningProps) => {
	const { data: total = 0, isLoading } = useQuery({
		queryKey: ["entries", "total", id],
		queryFn: () => getTotalProfit(id),
	});

	return (
		<div className="border border-stone-700 rounded-lg p-5 space-y-2">
			<div className="text-white">Total Earning</div>
			<div className="text-green-500 font-bold text-6xl">
				{isLoading ? "..." : `₹${total.toLocaleString("en-IN")}`}
			</div>
		</div>
	);
};

export default TotolEarning;
