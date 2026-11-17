// "use client";

// import { getTotalExpense } from "@/actions/get-total-expense";
// import { getTotalProfit } from "@/actions/get-total-profit";
// import { useQuery } from "@tanstack/react-query";
// import { Goal, IndianRupee, TrendingDown, TrendingUp } from "lucide-react";
// import React from "react";

// interface TotolEarningProps {
// 	id: string;
// }

// const TotolEarning = ({ id }: TotolEarningProps) => {
// 	const { data: total = 0, isLoading } = useQuery({
// 		queryKey: ["entries", "total", id],
// 		queryFn: () => getTotalProfit(id),
// 	});

// 	const { data: totalExpense = 0, isLoading: isExpenseLoading } = useQuery({
// 		queryKey: ["expenses", "totalExpense", id],
// 		queryFn: () => getTotalExpense(id),
// 	});

// 	const progress = (total / 100000) * 100;

// 	const remaining = total - totalExpense;

// 	const target = 100000;

// 	const left = target - total;

// 	return (
// 		<div className="space-y-4">
// 			<div className="grid grid-cols-3 gap-4">
// 				<div className="space-y-2 rounded-lg p-5  bg-[#0B1912] h-40 flex flex-col justify-between">
// 					<div className="text-[#8FA99A] flex items-center gap-2">
// 						<TrendingUp className="text-[#00C76A] " /> Total Earning
// 					</div>
// 					<div className="text-[#00C76A] font-bold text-5xl">
// 						{isLoading
// 							? "..."
// 							: `₹${total.toLocaleString("en-IN")}`}
// 					</div>
// 					<div className="text-[#8FA99A]">+ Income</div>
// 				</div>

// 				<div className="bg-[#1D1111] p-5 rounded-lg h-40 space-y-2 flex flex-col justify-between">
// 					<div className="text-[#8FA99A] flex items-center gap-2">
// 						<TrendingDown className="text-[#FF6969]" />
// 						Total Expenses
// 					</div>
// 					<div className="text-5xl font-bold text-[#FF6969]">
// 						{isExpenseLoading
// 							? "..."
// 							: `₹${totalExpense.toLocaleString("en-IN")}`}
// 					</div>
// 					<div className="text-[#8FA99A]">- Spending</div>
// 				</div>
// 				<div className="bg-[#101923] p-5 rounded-lg h-40 space-y-2 flex flex-col justify-between">
// 					<div className="text-[#8FA99A] flex items-center gap-2">
// 						<IndianRupee className="text-[#68BBFF]" />
// 						Net Balance
// 					</div>
// 					<div className="text-5xl font-bold text-[#68BBFF]">{`₹${remaining.toLocaleString("en-IN")}`}</div>
// 					<div className="text-[#8FA99A]">Available Balance</div>
// 				</div>
// 			</div>
// 			<div className="space-y-4 border border-stone-900 p-4 rounded-lg">
// 				<div className="flex items-center justify-between">
// 					<div className="text-green-100 flex items-center gap-2">
// 						<Goal className="text-[#00C76A]" />
// 						Goal Progress
// 					</div>
// 					<div className="text-[#00C76A] bg-[#0D1F16] rounded-full px-4 p-2">
// 						{progress.toFixed(2)}% Completed
// 					</div>
// 				</div>
// 				<div className="flex items-center justify-between">
// 					<div className="text-white">
// 						₹{total.toLocaleString("en-IN")}
// 					</div>
// 					<div className="text-[#8FA99A]">
// 						Target: ₹{target.toLocaleString("en-IN")}
// 					</div>
// 				</div>
// 				<div className="text-green-100 space-y-4">
// 					<div className="border border-stone-900 rounded-2xl w-full">
// 						<div
// 							style={{ width: `${progress.toFixed(2)}%` }}
// 							className={`bg-[#00C76A] h-2 rounded-lg flex items-center justify-center text-stone-900 font-bold`}
// 						></div>
// 					</div>
// 					<div className="flex items-center justify-between text-[#8FA99A]">
// 						<div>₹0</div>
// 						<div className="text-[#00C76A]">
// 							₹{left.toLocaleString("en-IN")} remaining
// 						</div>
// 						<div>₹1L</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default TotolEarning;

"use client";

import { getTotalExpense } from "@/actions/get-total-expense";
import { getTotalProfit } from "@/actions/get-total-profit";
import { useQuery } from "@tanstack/react-query";
import { Goal, IndianRupee, TrendingDown, TrendingUp } from "lucide-react";

interface TotolEarningProps {
	id: string;
}

const TotolEarning = ({ id }: TotolEarningProps) => {
	const { data: total = 0, isLoading } = useQuery({
		queryKey: ["entries", "total", id],
		queryFn: () => getTotalProfit(id),
	});

	const { data: totalExpense = 0, isLoading: isExpenseLoading } = useQuery({
		queryKey: ["expenses", "totalExpense", id],
		queryFn: () => getTotalExpense(id),
	});

	const earning = Number(total) || 0;
	const expense = Number(totalExpense) || 0;

	const remaining = earning - expense;

	const target = 100000;

	// Percentage calculations
	const expensePercentage = earning > 0 ? (expense / earning) * 100 : 0;

	const remainingPercentage = earning > 0 ? (remaining / earning) * 100 : 0;

	const progress = (earning / target) * 100;
	const left = target - earning;

	const formatAmount = (amount: number) =>
		amount.toLocaleString("en-IN", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-3 gap-4">
				{/* Total Earning */}
				<div className="bg-[#0B1912] rounded-lg p-5 h-40 flex flex-col justify-between">
					<div className="text-[#8FA99A] flex items-center gap-2">
						<TrendingUp className="text-[#00C76A]" />
						Total Earning
					</div>

					<div className="text-[#00C76A] font-bold text-5xl">
						{isLoading ? "..." : `₹${formatAmount(earning)}`}
					</div>

					<div className="text-[#8FA99A] flex justify-between">
						<span>+ Income</span>
						<span className="text-[#00C76A]">100%</span>
					</div>
				</div>

				{/* Total Expenses */}
				<div className="bg-[#1D1111] rounded-lg p-5 h-40 flex flex-col justify-between">
					<div className="text-[#8FA99A] flex items-center gap-2">
						<TrendingDown className="text-[#FF6969]" />
						Total Expenses
					</div>

					<div className="text-5xl font-bold text-[#FF6969]">
						{isExpenseLoading ? "..." : `₹${formatAmount(expense)}`}
					</div>

					<div className="text-[#B99A9A] flex justify-between">
						<span>- Spending</span>
						<span className="text-[#FF6969]">
							{expensePercentage.toFixed(2)}% of earnings
						</span>
					</div>
				</div>

				{/* Net Balance */}
				<div className="bg-[#101923] rounded-lg p-5 h-40 flex flex-col justify-between">
					<div className="text-[#8FA99A] flex items-center gap-2">
						<IndianRupee className="text-[#68BBFF]" />
						Net Balance
					</div>

					<div className="text-5xl font-bold text-[#68BBFF]">
						{isLoading || isExpenseLoading
							? "..."
							: `₹${formatAmount(remaining)}`}
					</div>

					<div className="text-[#91A8BE] flex justify-between items-center">
						<span>Balance</span>
						<span className="text-[#68BBFF]">
							{remainingPercentage.toFixed(2)}% retained
						</span>
					</div>
				</div>
			</div>

			{/* Goal Progress */}
			<div className="space-y-4 border border-stone-900 p-4 rounded-lg">
				<div className="flex items-center justify-between">
					<div className="text-green-100 flex items-center gap-2">
						<Goal className="text-[#00C76A]" />
						Goal Progress
					</div>

					<div className="text-[#00C76A] bg-[#0D1F16] rounded-full px-4 py-2">
						{progress.toFixed(2)}% Completed
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="text-white">₹{formatAmount(earning)}</div>

					<div className="text-[#8FA99A]">
						Target: ₹{target.toLocaleString("en-IN")}
					</div>
				</div>

				<div className="text-green-100 space-y-4">
					<div className="border border-stone-900 rounded-2xl w-full overflow-hidden">
						<div
							style={{
								width: `${Math.min(Math.max(progress, 0), 100)}%`,
							}}
							className="bg-[#00C76A] h-2 rounded-lg"
						/>
					</div>

					<div className="flex items-center justify-between text-[#8FA99A]">
						<div>₹0</div>

						<div className="text-[#00C76A]">
							{left > 0
								? `₹${formatAmount(left)} remaining`
								: `₹${formatAmount(Math.abs(left))} above goal`}
						</div>

						<div>₹1L</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TotolEarning;
