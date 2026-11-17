interface DropdownReusableProps {
	onDelete: () => void;
	onEdit: () => void;
	onClose: () => void;
}

const DropdownReusable = ({
	onDelete,
	onEdit,
	onClose,
}: DropdownReusableProps) => {
	const handleDelete = () => {
		onDelete();
		onClose();
	};

	return (
		<div className="absolute z-10 -left-20 bg-black border border-white rounded-lg p-2 text-white space-y-2 w-30">
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

export default DropdownReusable;
