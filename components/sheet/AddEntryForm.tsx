"use client";

import { createEntry } from "@/actions/create-entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React, { SetStateAction } from "react";
import EntryForm from "./EntryForm";

interface AddEntryFormProps {
	id: string;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const AddEntryForm = ({ id, setIsOpen }: AddEntryFormProps) => {
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
		<EntryForm
			submitLabel="Add Entry"
			isPending={isPending}
			onSubmit={handleSubmit}
			className="bottom-14 right-0"
		/>
	);
};

export default AddEntryForm;
