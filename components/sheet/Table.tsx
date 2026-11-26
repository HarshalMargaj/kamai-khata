"use client";

import { ChevronRight, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import AddEntryForm from "./AddEntryForm";
import { useOnClickOutside } from "usehooks-ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEntries } from "@/actions/get-entries";
import ActionCell from "./ActionCell";
import { deleteEntry } from "@/actions/delete-entry";
import UpdateEntryForm from "./UpdateEntryForm";

const headers = [
	"Sr. No.",
	"Source",
	"Date",
	"Invested",
	"Return",
	"Charges",
	"P/L",
];

interface TableProps {
	id: string;
}

const Table = ({ id }: TableProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLTableDataCellElement>(null);
	const [isVisible, setIsVisible] = useState(true);
	const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	useOnClickOutside(
		dropdownRef as React.RefObject<HTMLTableDataCellElement>,
		() => setEditingEntryId(null),
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

	const queryClient = useQueryClient();

	const { mutateAsync: deleteEntryMutation } = useMutation({
		mutationFn: (sheetId: string) => deleteEntry(sheetId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["entries"] });
		},
		onError: error => {
			console.log(error);
		},
	});

	return (
		<div className="space-y-4 relative">
			<div className="border-b border-stone-900 text-green-100 p-4 flex items-center justify-between">
				Earnings
				<div className="flex items-center gap-2">
					<div ref={ref} className="">
						<button
							onClick={() => setIsOpen(true)}
							className="text-white border border-stone-800 rounded-full p-1 cursor-pointer flex items-center gap-2 hover:border-white duration-500 transition-all"
						>
							<Plus size={20} />
						</button>
						{isOpen && (
							<AddEntryForm id={id} setIsOpen={setIsOpen} />
						)}
					</div>
					<div
						onClick={() => setIsVisible(!isVisible)}
						className="border border-stone-800 rounded-full p-1"
					>
						<ChevronRight
							size={20}
							className={`${isVisible ? "rotate-90" : "rotate-0"} transition-all duration-500`}
						/>
					</div>
				</div>
			</div>
			{isVisible && (
				<table className="text-green-100 w-full " border={2}>
					<thead className="border-b border-stone-900 text-stone-400">
						<tr>
							{headers.map(header => (
								<th key={header} className="pb-4 px-4">
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
									className="border-b border-stone-900 last:border-0 hover:bg-neutral-900 text-sm"
								>
									<td className="text-center p-2">
										{index + 1}
									</td>
									<td className="text-center p-2">
										{entry.incomeSource}
									</td>
									<td className="text-center p-2 w-40">
										{new Date(
											entry.date,
										).toLocaleDateString("en-IN", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
									</td>
									<td className="text-center p-2">
										{formatINR(entry.investedAmount)}
									</td>
									<td className="text-center p-2">
										{formatINR(entry.returnAmount)}
									</td>
									<td className="text-center p-2 text-rose-500 font-medium">
										{formatINR(entry.fees)}
									</td>
									<td className="text-center p-2 text-green-400 font-medium">
										{formatINR(
											entry.returnAmount -
												entry.investedAmount -
												entry.fees,
										)}
									</td>
									<td
										ref={
											editingEntryId === entry.id
												? dropdownRef
												: null
										}
										className="relative"
									>
										<ActionCell
											onDelete={() =>
												deleteEntryMutation(entry.id)
											}
											onEdit={() =>
												setEditingEntryId(entry.id)
											}
										/>

										{editingEntryId === entry.id && (
											<UpdateEntryForm
												entry={entry}
												setEditingExpenseId={
													setEditingEntryId
												}
											/>
										)}
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
			)}
		</div>
	);
};

export default Table;
