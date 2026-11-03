"use client";

import { deleteEntry } from "@/actions/delete-entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface DropdownProps {
	id: string;
}

const Dropdown = ({ id }: DropdownProps) => {
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

	const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		await deleteEntryMutation(id);
	};
	return (
		<div className="absolute z-10 -left-20 bg-stone-900 rounded-lg p-2 text-white space-y-2 w-30">
			<div
				onClick={handleDelete}
				className="flex items-center gap-3 hover:bg-stone-800 p-2 rounded-md text-red-500 cursor-pointer"
			>
				Delete
			</div>
			<div className="flex items-center gap-3 hover:bg-stone-800 p-2 rounded-md cursor-pointer">
				Edit
			</div>
		</div>
	);
};

export default Dropdown;
