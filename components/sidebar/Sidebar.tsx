"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { useOnClickOutside } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { getSheets } from "@/actions/get-sheets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, UserButton, useUser } from "@clerk/nextjs";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(true);
	const ref = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const { user } = useUser();

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
		<div
			className={`relative ${isExpanded ? "w-75" : "w-20"} border-r border-stone-700 h-full select-none duration-150 transition-all flex flex-col justify-items-center`}
		>
			<div
				onClick={prev => setIsExpanded(!prev)}
				className="absolute -right-3.5 top-6.5 rounded-md border border-stone-700 bg-stone-900 cursor-pointer hover:border-white duration-150 transition-all"
			>
				{isExpanded ? (
					<ChevronLeft className="text-stone-400" />
				) : (
					<ChevronRight className="text-stone-400" />
				)}
			</div>
			<div className="p-5 text-3xl font-bold text-green-500">
				{isExpanded ? "Kamai Khata" : "KK"}
			</div>
			<div ref={ref} className="relative px-5">
				<button
					onClick={handleClick}
					className={`border border-stone-700 w-full p-2 ${isExpanded ? "rounded-md" : "rounded-[20px]"} flex items-center justify-center cursor-pointer hover:border-white duration-500 transition-all text-white`}
				>
					<Plus />
				</button>
				{isOpen && <Dropdown setIsOpen={setIsOpen} />}
			</div>
			{isExpanded && (
				<div className="space-y-4 w-full flex-1 p-5">
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
			)}
			<Show when="signed-out">
				<Link
					href={"/sign-in"}
					className="border border-stone-700 text-white p-2 w-full rounded-md hover:border-white duration-500 transition-all cursor-pointer"
				>
					Log In
				</Link>
			</Show>
			<Show when="signed-in">
				<div
					className={`${isExpanded ? "border-t" : "border-none"} border-stone-700 p-5 mt-auto`}
				>
					<div className="flex items-center gap-2">
						<UserButton
							appearance={{
								elements: {
									userButtonAvatarBox: {
										width: "40px",
										height: "40px",
									},
								},
							}}
						/>
						{isExpanded && (
							<div className="text-green-100">
								<div>{user?.fullName}</div>
								<div className="text-gray-600">
									{user?.emailAddresses[0].emailAddress}
								</div>
							</div>
						)}
					</div>
				</div>
			</Show>
		</div>
	);
};

export default Sidebar;
