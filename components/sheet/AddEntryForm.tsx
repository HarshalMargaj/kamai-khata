"use client";

import { createEntry } from "@/actions/create-entry";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { SetStateAction, useState } from "react";

const inputClass =
	"border border-stone-700 rounded-md p-2 text-white outline-none focus:border-white transition-all duration-300 bg-transparent placeholder:text-stone-500";
const labelClass = "text-sm font-medium text-stone-300";

interface AddEntryFormProps {
	id: string;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const AddEntryForm = ({ id, setIsOpen }: AddEntryFormProps) => {
	const profit = 0;
	const queryClient = useQueryClient();

	const { mutateAsync: createEntryMutation, isPending } = useMutation({
		mutationFn: (formData: FormData) => createEntry(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["entries"] });
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		formData.append("sheetId", id);

		await createEntryMutation(formData);

		setIsOpen(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="absolute bottom-14 right-0 z-10 bg-black border border-white p-5 rounded-lg space-y-4 select-none"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="incomeSource" className={labelClass}>
					Income Source
				</label>
				<input
					id="incomeSource"
					name="incomeSource"
					type="text"
					required
					autoComplete="off"
					placeholder="e.g. Stocks, Freelance, Mutual Fund"
					className={inputClass}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="date" className={labelClass}>
					Date
				</label>
				<input
					id="date"
					name="date"
					type="date"
					required
					className={`${inputClass} scheme-dark`}
				/>
			</div>

			<div className="flex items-center w-full gap-4">
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="invested" className={labelClass}>
						Invested Amount (₹)
					</label>
					<input
						id="invested"
						name="invested"
						type="number"
						min="0"
						step="0.01"
						required
						placeholder="0.00"
						className={inputClass}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="returnAmount" className={labelClass}>
						Return Amount (₹)
					</label>
					<input
						id="returnAmount"
						name="returnAmount"
						type="number"
						min="0"
						step="0.01"
						required
						placeholder="0.00"
						className={inputClass}
					/>
				</div>
			</div>

			<div className="flex items-center w-full gap-4">
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="feeCut" className={labelClass}>
						Fees & Charges (₹)
					</label>
					<input
						id="feeCut"
						name="feeCut"
						type="number"
						min="0"
						step="0.01"
						placeholder="0.00"
						className={inputClass}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="profit" className={labelClass}>
						Net Profit / Loss (₹)
					</label>
					<input
						id="profit"
						type="text"
						readOnly
						tabIndex={-1}
						value={profit.toLocaleString("en-IN")}
						className={`${inputClass} cursor-not-allowed ${
							profit >= 0 ? "text-green-500" : "text-red-500"
						}`}
					/>
				</div>
			</div>

			<button
				disabled={isPending}
				type="submit"
				className="w-full p-2 bg-green-500 text-black rounded-md font-bold cursor-pointer hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
			>
				{isPending ? (
					<LoaderCircle className="animate-spin transition-all" />
				) : (
					"Add Entry"
				)}
			</button>
		</form>
	);
};

export default AddEntryForm;
