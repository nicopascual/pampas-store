import { useState } from "react";

import { cn } from "@/lib/utils";

import { Input } from "./input";

function EyeIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function EyeOffIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
			<line x1="1" y1="1" x2="23" y2="23" />
		</svg>
	);
}

function getPasswordStrength(password: string): {
	score: number;
	label: string;
	color: string;
	suggestion: string;
} {
	if (!password) {
		return { score: 0, label: "", color: "", suggestion: "" };
	}

	let score = 0;
	const suggestions: string[] = [];

	if (password.length >= 8) score++;
	else suggestions.push("lengthening it");

	if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;

	if (/\d/.test(password)) score++;
	else suggestions.push("adding numbers");

	if (/[^a-zA-Z0-9]/.test(password)) score++;
	else suggestions.push("symbols");

	if (score <= 1) {
		return {
			score: 1,
			label: "weak",
			color: "text-red-500",
			suggestion:
				suggestions.length > 0 ? `Try ${suggestions.join(" or ")}.` : "",
		};
	}
	if (score === 2) {
		return {
			score,
			label: "fair",
			color: "text-yellow-500",
			suggestion:
				suggestions.length > 0 ? `Try ${suggestions.join(" or ")}.` : "",
		};
	}
	if (score === 3) {
		return {
			score,
			label: "good",
			color: "text-blue-500",
			suggestion: "",
		};
	}
	return {
		score,
		label: "strong",
		color: "text-green-500",
		suggestion: "",
	};
}

interface PasswordInputProps
	extends Omit<React.ComponentProps<typeof Input>, "type"> {
	showStrengthMeter?: boolean;
}

function PasswordInput({
	className,
	showStrengthMeter = false,
	value,
	...props
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const strength = getPasswordStrength(String(value || ""));

	return (
		<div className="space-y-2">
			<div className="relative">
				<Input
					type={showPassword ? "text" : "password"}
					className={cn("pr-10", className)}
					value={value}
					{...props}
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{showPassword ? (
						<EyeOffIcon className="size-5" />
					) : (
						<EyeIcon className="size-5" />
					)}
				</button>
			</div>
			{showStrengthMeter && value && strength.label && (
				<div className="space-y-2">
					{/* Progress bar */}
					<div className="flex gap-1">
						{[1, 2, 3, 4].map((level) => (
							<div
								key={level}
								className={`h-1 flex-1 rounded-full ${
									level <= strength.score
										? strength.score <= 1
											? "bg-red-500"
											: strength.score === 2
												? "bg-yellow-500"
												: strength.score === 3
													? "bg-blue-500"
													: "bg-green-500"
										: "bg-muted"
								}`}
							/>
						))}
					</div>
					{/* Text */}
					<p className="text-sm">
						<span className="text-muted-foreground">Password strength: </span>
						<span className={strength.color}>{strength.label}.</span>{" "}
						{strength.suggestion && (
							<span className="text-muted-foreground">
								{strength.suggestion}
							</span>
						)}
					</p>
				</div>
			)}
		</div>
	);
}

export { PasswordInput };
