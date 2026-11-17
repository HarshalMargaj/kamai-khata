"use client";

import React, { SetStateAction } from "react";
import ExpenseForm from "./ExpenseForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "@/actions/create-expense";

interface AddExpenseFormProps {
	id: string;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const AddExpenseForm = ({ id, setIsOpen }: AddExpenseFormProps) => {
	const queryClient = useQueryClient();

	const { mutateAsync: createExpenseMutation, isPending } = useMutation({
		mutationFn: (formData: FormData) => createExpense(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["expenses"] });
			setIsOpen(false);
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		formData.append("sheetId", id);

		await createExpenseMutation(formData);
	};

	return (
		<div className="">
			<ExpenseForm
				className="bottom-25 right-5"
				onsubmit={handleSubmit}
				isPending={isPending}
			/>
		</div>
	);
};

export default AddExpenseForm;
