import React, { useRef, useState } from "react";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import ActionDropdown from "./ActionDropdown";
import { useOnClickOutside } from "usehooks-ts";

interface SheetsProps {
	sheetId: string;
	isActive: boolean;
	sheetName: string;
}

const Sheets = ({ sheetId, isActive, sheetName }: SheetsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	return (
		<div
			ref={dropdownRef}
			className={`${isActive ? "bg-green-500 text-black font-bold" : "hover:bg-green-100/5 text-green-200"} cursor-pointer w-full p-2 rounded-md flex items-center justify-between`}
		>
			<Link href={`/sheet/${sheetId}`} className="w-full">
				{sheetName}
			</Link>
			<div
				onClick={() => setIsOpen(true)}
				className="text-center cursor-pointer hover:bg-green-600 rounded-md w-6 h-6 flex items-center justify-center"
			>
				<EllipsisVertical size={20} />
			</div>
			{isOpen && <ActionDropdown id={sheetId} />}
		</div>
	);
};

export default Sheets;
