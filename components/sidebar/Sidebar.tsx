"use client";

import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { useOnClickOutside } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { getSheets } from "@/actions/get-sheets";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const handleClick = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, handleClose);

	const getAllsheets = async () => {
		const response = await getSheets();
		return response;
	};

	const { data: sheets = [] } = useQuery({
		queryKey: ["sheets"],
		queryFn: () => getAllsheets(),
	});

	return (
		<div className="p-5 space-y-4 w-75 border-r border-stone-700 h-full">
			<div className="text-3xl font-bold text-green-500">Kamai Khata</div>
			<div ref={ref} className="space-y-4">
				<button
					onClick={handleClick}
					className="border border-stone-700 w-full p-2 rounded-md flex items-center justify-center cursor-pointer hover:border-white duration-500 transition-all text-white"
				>
					<Plus />
				</button>
				{isOpen && <Dropdown setIsOpen={setIsOpen} />}
			</div>
			<div className="space-y-4 w-full">
				{sheets.map(sheet => {
					const isActive = pathname === `/sheet/${sheet.id}`;

					return (
						<Link
							href={`/sheet/${sheet.id}`}
							key={sheet.id}
							className={`${isActive ? "bg-green-500 text-black font-bold" : "bg-transparent text-green-200"} cursor-pointer w-full p-2 rounded-md block`}
						>
							{sheet.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;
