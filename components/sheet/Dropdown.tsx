"use client";

import { deleteEntry } from "@/actions/delete-entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import UpdateEntryForm from "./UpdateEntryForm";
import { useOnClickOutside } from "usehooks-ts";
import { EntryWithNumbers } from "@/types/EntryWithNumbers";

interface DropdownProps {
	entry: EntryWithNumbers;
}

const Dropdown = ({ entry }: DropdownProps) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const dropdownRef = useRef<HTMLDivElement>(null);

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
		await deleteEntryMutation(entry.id);
	};

	useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, () =>
		setIsEditing(false),
	);

	return (
		<div
			ref={dropdownRef}
			className="absolute z-10 -left-20 bg-black border border-white rounded-lg p-2 text-white space-y-2 w-30"
		>
			<div
				onClick={handleDelete}
				className="flex items-center gap-3 hover:bg-stone-800 p-2 rounded-md text-red-500 cursor-pointer"
			>
				Delete
			</div>
			<div
				onClick={() => setIsEditing(true)}
				className="flex items-center gap-3 hover:bg-stone-800 p-2 rounded-md cursor-pointer"
			>
				Edit
			</div>
			{isEditing && (
				<UpdateEntryForm entry={entry} setIsEditing={setIsEditing} />
			)}
		</div>
	);
};

export default Dropdown;
