"use client";

import { ChevronRight, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { useOnClickOutside } from "usehooks-ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpenses } from "@/actions/get-expenses";
import ActionCell from "./ActionCell";
import { deleteExpense } from "@/actions/delete-expense";

interface ExpensesTableProps {
	id: string;
}

const headers = ["Sr. No.", "Title", "Date", "Amount"];

const ExpensesTable = ({ id }: ExpensesTableProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	const { data: expenses = [] } = useQuery({
		queryKey: ["expenses"],
		queryFn: () => getExpenses(id),
	});

	console.log(expenses);

	const formatINR = (value: number) =>
		new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);

	const { mutateAsync: deleteExpenseMutation } = useMutation({
		mutationFn: (id: string) => deleteExpense(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["expenses"] });
		},
		onError: error => {
			console.log(error);
		},
	});

	return (
		<div>
			<div className="border-b border-stone-900 text-green-100 p-4 flex items-center justify-between">
				Expenses
				<div className="flex items-center gap-2">
					<div ref={ref} className="">
						<button
							onClick={() => setIsOpen(true)}
							className="text-white border border-stone-800 rounded-full p-1 cursor-pointer flex items-center gap-2 hover:border-white duration-500 transition-all"
						>
							<Plus size={20} />
						</button>
						{isOpen && (
							<AddExpenseForm id={id} setIsOpen={setIsOpen} />
						)}
					</div>
					<div
						onClick={() => setIsVisible(!isVisible)}
						className="border border-stone-700 rounded-full p-1"
					>
						<ChevronRight
							size={20}
							className={`${isVisible ? "rotate-90" : "rotate-0"} transition-all duration-500`}
						/>
					</div>
				</div>
			</div>
			{isVisible && (
				<table className="text-green-100 w-full">
					<thead className="border-b border-stone-900 text-stone-400">
						<tr>
							{headers.map(header => (
								<th key={header} className="p-4">
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{expenses.length > 0 ? (
							expenses.map((expense, index) => (
								<tr
									key={expense.id}
									className="border-b border-stone-900 last:border-0 hover:bg-neutral-900 text-sm"
								>
									<td className="text-center p-2">
										{index + 1}
									</td>

									<td className="text-center p-2">
										{expense.title}
									</td>

									<td className="text-center p-2 w-40">
										{new Date(
											expense.date,
										).toLocaleDateString("en-IN", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
									</td>

									<td className="text-center p-2 text-rose-500 font-medium">
										{formatINR(Number(expense.amount))}
									</td>
									<td className="relative">
										<ActionCell
											onDelete={() =>
												deleteExpenseMutation(
													expense.id,
												)
											}
										/>
									</td>
								</tr>
							))
						) : (
							<tr className="text-center">
								<td colSpan={4} className="p-5 text-stone-500">
									Add your first expense to start tracking
									your expenses.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default ExpensesTable;
