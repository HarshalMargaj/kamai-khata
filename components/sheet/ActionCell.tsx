import { EllipsisVertical } from "lucide-react";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import DropdownReusable from "./DropdownReusable";

interface ActionCellProps {
	onDelete: () => void;
	onEdit: () => void;
}

const ActionCell = ({ onDelete, onEdit }: ActionCellProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	return (
		<div ref={dropdownRef}>
			<div
				onClick={() => setIsOpen(true)}
				className="text-center cursor-pointer hover:bg-stone-600 rounded-md w-6 h-6 flex items-center justify-center"
			>
				<EllipsisVertical size={20} />
			</div>
			{isOpen && (
				<DropdownReusable
					onClose={() => setIsOpen(false)}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			)}
		</div>
	);
};

export default ActionCell;
