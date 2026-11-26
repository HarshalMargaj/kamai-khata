"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface MonthlyData {
	month: string;
	earning: number;
	expense: number;
}

interface MonthlyOverviewProps {
	data: MonthlyData[];
}

const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export default function MonthlyOverview({ data }: MonthlyOverviewProps) {
	return (
		<div className="w-full h-[320px]">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#272727"
						vertical={false}
					/>

					<XAxis
						dataKey="month"
						stroke="#888"
						tickLine={false}
						axisLine={false}
					/>

					<YAxis
						stroke="#888"
						tickLine={false}
						axisLine={false}
						tickFormatter={value => `₹${value / 1000}k`}
					/>

					<Tooltip
						formatter={value => formatINR(Number(value))}
						contentStyle={{
							backgroundColor: "#171717",
							border: "1px solid #333",
							borderRadius: "8px",
						}}
					/>

					<Bar
						dataKey="earning"
						name="Earning"
						fill="#16C978"
						radius={[4, 4, 0, 0]}
					/>

					<Bar
						dataKey="expense"
						name="Expense"
						fill="#F87171"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
