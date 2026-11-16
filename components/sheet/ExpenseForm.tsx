import { LoaderCircle } from "lucide-react";
import React from "react";

const inputClass =
	"border border-stone-700 rounded-md p-2 text-white outline-none focus:border-white transition-all duration-300 bg-transparent placeholder:text-stone-500";
const labelClass = "text-sm font-medium text-stone-300";

interface ExpenseFormProps {
	className: string;
	onsubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
	isPending: boolean;
}

const ExpenseForm = ({ className, onsubmit, isPending }: ExpenseFormProps) => {
	return (
		<form
			onSubmit={onsubmit}
			className={`absolute ${className} z-10 bg-black border border-white p-5 rounded-lg space-y-4 select-none`}
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="title" className={labelClass}>
					Expense Title
				</label>
				<input
					id="title"
					type="text"
					placeholder="e.g. Petrol, Groceries, Shopping, Rent"
					name="title"
					className={`${inputClass} scheme-dark`}
				/>
			</div>
			<div className="flex items-center gap-4">
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
				<div className="flex flex-col gap-2">
					<label htmlFor="amount" className={labelClass}>
						Amount (₹)
					</label>
					<input
						name="amount"
						id="amount"
						type="number"
						min={0}
						step="0.01"
						required
						placeholder="0.00"
						className={inputClass}
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
					"Add Expense"
				)}
			</button>
		</form>
	);
};

export default ExpenseForm;
