import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import ActionDropdown from "./ActionDropdown";
import { useOnClickOutside } from "usehooks-ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSheet } from "@/actions/update-sheet";

interface SheetsProps {
	sheetId: string;
	isActive: boolean;
	sheetName: string;
}

const Sheets = ({ sheetId, isActive, sheetName }: SheetsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(sheetName);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();

	useEffect(() => {
		inputRef.current?.select();
	}, []);

	useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false),
	);

	const { mutateAsync: updateSheetMutation } = useMutation({
		mutationFn: ({
			sheetId,
			sheetName,
		}: {
			sheetId: string;
			sheetName: string;
		}) => updateSheet({ sheetId, sheetName }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sheets"] });
			setIsEditing(false);
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		const trimmed = name.trim();
		if (!trimmed || trimmed === sheetName) {
			setIsEditing(false);
			return;
		}

		await updateSheetMutation({ sheetId, sheetName: name });
	};

	return (
		<div
			ref={dropdownRef}
			className={`${isActive ? "bg-green-500 text-black font-bold" : "hover:bg-green-100/5 text-green-200"} cursor-pointer w-full p-2 rounded-md flex items-center justify-between`}
		>
			{isEditing ? (
				<form onSubmit={handleSubmit}>
					<input
						ref={inputRef}
						type="text"
						autoFocus
						className="w-full outline-none border border-stone-700 rounded-lg px-2"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</form>
			) : (
				<Link href={`/sheet/${sheetId}`} className="w-full">
					{sheetName}
				</Link>
			)}
			<div
				onClick={() => setIsOpen(true)}
				className="text-center cursor-pointer hover:bg-green-600 rounded-md w-6 h-6 flex items-center justify-center"
			>
				<EllipsisVertical size={20} />
			</div>
			{isOpen && (
				<ActionDropdown
					id={sheetId}
					setIsEditing={setIsEditing}
					setIsOpen={setIsOpen}
				/>
			)}
		</div>
	);
};

export default Sheets;
