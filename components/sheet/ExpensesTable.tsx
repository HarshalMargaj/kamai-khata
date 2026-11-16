"use client";

import { ChevronRight, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { useOnClickOutside } from "usehooks-ts";

const ExpensesTable = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

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
						{isOpen && <AddExpenseForm />}
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
		</div>
	);
};

export default ExpensesTable;
