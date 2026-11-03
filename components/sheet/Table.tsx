"use client";

import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import AddEntryForm from "./AddEntryForm";
import { useOnClickOutside } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "@/actions/get-entries";
import ActionCell from "./ActionCell";

const headers = [
	"Sr. No.",
	"Income Source",
	"Date",
	"Invested",
	"Return",
	"Fee Cut",
	"Profit & Loss",
];

interface TableProps {
	id: string;
}

const Table = ({ id }: TableProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	const { data: entries = [] } = useQuery({
		queryKey: ["entries"],
		queryFn: () => getEntries(id),
	});

	const formatINR = (value: number) =>
		new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);

	return (
		<div className="space-y-4 relative flex-1">
			<div ref={ref} className="absolute bottom-0 right-0">
				<button
					onClick={() => setIsOpen(true)}
					className="text-white border border-stone-700 rounded-md cursor-pointer flex items-center gap-2 p-2 hover:border-white duration-500 transition-all"
				>
					<Plus />
				</button>
				{isOpen && <AddEntryForm id={id} setIsOpen={setIsOpen} />}
			</div>
			<table className="text-white w-full" border={2}>
				<thead className="border-b border-stone-700 text-stone-400">
					<tr>
						{headers.map(header => (
							<th key={header} className="p-2">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{entries.length > 0 ? (
						entries.map((entry, index) => (
							<tr
								key={entry.id}
								className="border-b border-stone-800 last:border-0 hover:bg-neutral-900 text-sm"
							>
								<td className="text-center p-2">{index + 1}</td>
								<td className="text-center p-2">
									{entry.incomeSource}
								</td>
								<td className="text-center p-2">
									{new Date(entry.date).toLocaleDateString(
										"en-IN",
										{
											day: "2-digit",
											month: "short",
											year: "numeric",
										},
									)}
								</td>
								<td className="text-center p-2">
									{formatINR(entry.investedAmount)}
								</td>
								<td className="text-center p-2">
									{formatINR(entry.returnAmount)}
								</td>
								<td className="text-center p-2 text-red-500">
									{formatINR(entry.fees)}
								</td>
								<td className="text-center p-2 text-green-500">
									{formatINR(
										entry.returnAmount -
											entry.investedAmount -
											entry.fees,
									)}
								</td>
								<td className="relative">
									<ActionCell entryId={entry.id} />
								</td>
							</tr>
						))
					) : (
						<tr className="text-center">
							<td colSpan={7} className="p-5 text-stone-500">
								Add your first entry to start tracking your
								profit and loss.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
