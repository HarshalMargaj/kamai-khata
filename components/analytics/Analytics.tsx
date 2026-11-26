import { ChartSpline, Plus } from "lucide-react";
import React from "react";
import MonthlyOverview from "./MonthlyOverview";

const Analytics = () => {
	return (
		<div className="w-full border border-stone-900 rounded-lg p-4 text-white flex flex-col items-center gap-4">
			<div>
				<MonthlyOverview />
			</div>
			<div>
				<ChartSpline />
			</div>
			<div>Add another chart</div>
			<div className="text-[#91A8BE]">
				Customize this sheet with the analytics you need.
			</div>
			<button className="flex items-center gap-2 rounded-lg bg-green-500 text-black p-2 cursor-pointer font-medium hover:bg-green-600">
				<Plus size={20} /> Add Chart
			</button>
		</div>
	);
};

export default Analytics;
