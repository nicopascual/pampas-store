"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Sheet({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetBackdrop({
	className,
	...props
}: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="sheet-backdrop"
			className={cn(
				"data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/50 data-closed:animate-out data-open:animate-in",
				className,
			)}
			{...props}
		/>
	);
}

type SheetContentProps = DialogPrimitive.Popup.Props & {
	side?: "left" | "right" | "top" | "bottom";
	showClose?: boolean;
};

function SheetContent({
	side = "left",
	showClose = true,
	className,
	children,
	...props
}: SheetContentProps) {
	return (
		<SheetPortal>
			<SheetBackdrop />
			<DialogPrimitive.Popup
				data-slot="sheet-content"
				data-side={side}
				className={cn(
					"fixed z-50 flex flex-col gap-4 bg-background shadow-lg outline-none transition-transform duration-300 ease-in-out",
					side === "left" &&
						"inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-closed:-translate-x-full data-open:translate-x-0",
					side === "right" &&
						"inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-closed:translate-x-full data-open:translate-x-0",
					side === "top" &&
						"inset-x-0 top-0 w-full border-b data-closed:-translate-y-full data-open:translate-y-0",
					side === "bottom" &&
						"inset-x-0 bottom-0 w-full border-t data-closed:translate-y-full data-open:translate-y-0",
					className,
				)}
				{...props}
			>
				{children}
				{showClose && (
					<SheetClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
						<XIcon className="size-4" />
						<span className="sr-only">Close</span>
					</SheetClose>
				)}
			</DialogPrimitive.Popup>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 p-4", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	);
}

function SheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="sheet-title"
			className={cn("font-semibold text-foreground text-lg", className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetPortal,
	SheetBackdrop,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
