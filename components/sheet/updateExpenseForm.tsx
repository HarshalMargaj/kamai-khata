"use client";

import React, { SetStateAction } from "react";
import ExpenseForm from "./ExpenseForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "@/actions/update-expense";
import type { Expense } from "@/app/generated/prisma/client";

interface UpdateExpenseFormProps {
	expenseId: string;
	setEditingExpenseId: React.Dispatch<SetStateAction<string | null>>;
	expense: Expense;
}

const UpdateExpenseForm = ({
	expenseId,
	setEditingExpenseId,
	expense,
}: UpdateExpenseFormProps) => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateExpenseMutation, isPending } = useMutation({
		mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
			updateExpense({ id, formData }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["expenses"] });
			setEditingExpenseId(null);
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		await updateExpenseMutation({ id: expenseId, formData });
	};

	return (
		<ExpenseForm
			onsubmit={handleSubmit}
			isPending={isPending}
			submitLabel="Update Expense"
			defaultValues={{
				title: expense.title,
				date: new Date(expense.date).toISOString().slice(0, 10),
				amount: expense.amount,
			}}
			className="bottom-0 right-0"
		/>
	);
};

export default UpdateExpenseForm;
