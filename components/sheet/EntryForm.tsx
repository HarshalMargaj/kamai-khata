import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

const inputClass =
	"border border-stone-700 rounded-md p-2 text-white outline-none focus:border-white transition-all duration-300 bg-transparent placeholder:text-stone-500";
const labelClass = "text-sm font-medium text-stone-300";

export interface EntryFormValues {
	incomeSource: string;
	date: string; // "YYYY-MM-DD"
	investedAmount: number;
	returnAmount: number;
	fees: number;
}

interface EntryFormProps {
	defaultValues?: EntryFormValues;
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
	isPending: boolean;
	submitLabel: string;
	className?: string;
}

const EntryForm = ({
	onSubmit,
	isPending,
	submitLabel,
	className,
	defaultValues,
}: EntryFormProps) => {
	const [investedAmount, setInvestedAmount] = useState(
		defaultValues?.investedAmount?.toString() ?? "",
	);
	const [returnAmount, setReturnAmount] = useState(
		defaultValues?.returnAmount?.toString() ?? "",
	);
	const [fees, setFees] = useState(defaultValues?.fees?.toString() ?? "");

	const profit = Number(returnAmount) - Number(investedAmount) - Number(fees);

	return (
		<form
			onSubmit={onSubmit}
			className={`absolute ${className} z-10 bg-black border border-white p-5 rounded-lg space-y-4 select-none`}
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
					defaultValue={defaultValues?.incomeSource}
					// onChange={e => setIconmeSource(e.target.value)}
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
					defaultValue={defaultValues?.date}
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
						value={investedAmount}
						onChange={e => setInvestedAmount(e.target.value)}
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
						value={returnAmount}
						onChange={e => setReturnAmount(e.target.value)}
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
						value={fees}
						onChange={e => setFees(e.target.value)}
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
						className={`${inputClass}`}
						value={profit}
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
					submitLabel
				)}
			</button>
		</form>
	);
};

export default EntryForm;
