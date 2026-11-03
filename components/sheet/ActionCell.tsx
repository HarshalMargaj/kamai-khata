import { EllipsisVertical } from "lucide-react";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Dropdown from "./Dropdown";

interface ActionCellProps {
	entryId: string;
}

const ActionCell = ({ entryId }: ActionCellProps) => {
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
			{isOpen && <Dropdown id={entryId} />}
		</div>
	);
};

export default ActionCell;
