import { CreateSheet } from "@/actions/create-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { SetStateAction } from "react";

interface DropdownProps {
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Dropdown = ({ setIsOpen }: DropdownProps) => {
	const queryClient = useQueryClient();

	const { mutateAsync: createSheetMutation } = useMutation({
		mutationFn: (name: string) => CreateSheet(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sheets"] });
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const sheetName = formData.get("name") as string;

		await createSheetMutation(sheetName);
		setIsOpen(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-neutral-900 p-2 rounded-md space-y-2"
		>
			<input
				autoFocus
				type="text"
				name="name"
				required
				placeholder="Enter sheet name"
				className="outline-none border border-stone-700 w-full rounded-md p-2 text-white"
			/>
			<button className="p-2 bg-green-500 text-black rounded-md w-full font-bold cursor-pointer hover:bg-green-600 duration-500 transition-all">
				Create Sheet
			</button>
		</form>
	);
};

export default Dropdown;
