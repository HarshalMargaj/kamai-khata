import { deleteSheet } from "@/actions/delete-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";

interface ActionDropdownProps {
	id: string;
	setIsEditing: React.Dispatch<SetStateAction<boolean>>;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ActionDropdown = ({
	id,
	setIsEditing,
	setIsOpen,
}: ActionDropdownProps) => {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteSheetMutation } = useMutation({
		mutationFn: (sheetId: string) => deleteSheet(sheetId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sheets"] });
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleDelete = async (id: string) => {
		await deleteSheetMutation(id);
	};

	return (
		<div className="absolute z-10 -right-15 top-45 bg-stone-900 rounded-lg p-2 text-white space-y-2 w-30">
			<div
				onClick={() => handleDelete(id)}
				className="flex items-center gap-3 hover:bg-stone-800 p-2 rounded-md text-red-500 cursor-pointer"
			>
				Delete
			</div>
			<div
				onClick={() => {
					setIsEditing(true);
					setIsOpen(false);
				}}
				className="flex items-center gap-3 hover:bg-stone-800 p-2 rounded-md cursor-pointer"
			>
				Edit
			</div>
		</div>
	);
};

export default ActionDropdown;
