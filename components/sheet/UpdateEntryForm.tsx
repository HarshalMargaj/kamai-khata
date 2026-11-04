import React, { SetStateAction } from "react";
import EntryForm from "./EntryForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntry } from "@/actions/update-entry";

import { EntryWithNumbers } from "@/types/EntryWithNumbers";

interface UpdateEntryFormProps {
	entry: EntryWithNumbers;
	setIsEditing: React.Dispatch<SetStateAction<boolean>>;
}

const UpdateEntryForm = ({ entry, setIsEditing }: UpdateEntryFormProps) => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateEntryMutation, isPending } = useMutation({
		mutationFn: (formData: FormData) => updateEntry(formData),
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
		formData.append("entryId", entry.id);

		await updateEntryMutation(formData);
		setIsEditing(false);
	};

	return (
		<EntryForm
			submitLabel="Update Entry"
			onSubmit={handleSubmit}
			isPending={isPending}
			className="top-0 right-0"
			defaultValues={{
				incomeSource: entry.incomeSource,
				investedAmount: entry.investedAmount,
				returnAmount: entry.returnAmount,
				fees: entry.fees,
				date: new Date(entry.date).toISOString().slice(0, 10),
			}}
		/>
	);
};

export default UpdateEntryForm;
