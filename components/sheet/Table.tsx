"use client";

import { Divide, EllipsisVertical, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import AddEntryForm from "./AddEntryForm";
import { useOnClickOutside } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "@/actions/get-entries";
import Dropdown from "./Dropdown";

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
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, () =>
		setIsVisible(false),
	);

	const { data: entries = [] } = useQuery({
		queryKey: ["entries"],
		queryFn: () => getEntries(id),
	});

	return (
		<div className="space-y-4">
			<div ref={ref} className="relative">
				<button
					onClick={() => setIsOpen(true)}
					className="text-white border border-stone-700 rounded-md cursor-pointer flex items-center gap-2 p-2 hover:border-white duration-500 transition-all"
				>
					<Plus /> Add Entry
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
								className="border-b border-stone-800 last:border-0 hover:bg-neutral-900"
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
									{entry.investedAmount}
								</td>
								<td className="text-center p-2">
									{entry.returnAmount}
								</td>
								<td className="text-center p-2 text-red-500">
									{entry.fees}
								</td>
								<td className="text-center p-2 text-green-500">
									{(
										entry.returnAmount -
										entry.investedAmount -
										entry.fees
									).toFixed(2)}
								</td>
								<td className="relative">
									<div ref={dropdownRef}>
										<div
											onClick={() => setIsVisible(true)}
											className="text-center cursor-pointer hover:bg-stone-600 rounded-md w-6 h-6 flex items-center justify-center"
										>
											<EllipsisVertical size={20} />
										</div>
										{isVisible && (
											<Dropdown id={entry.id} />
										)}
									</div>
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
