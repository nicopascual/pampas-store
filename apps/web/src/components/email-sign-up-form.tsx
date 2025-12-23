import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { useSignUpSchema } from "@/lib/zod-i18n";

import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PasswordInput } from "./ui/password-input";

function LogoIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M12 2L2 7L12 12L22 7L12 2Z"
				fill="currentColor"
				className="text-primary"
			/>
			<path
				d="M2 17L12 22L22 17"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-primary"
			/>
			<path
				d="M2 12L12 17L22 12"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-primary"
			/>
		</svg>
	);
}

export default function EmailSignUpForm({
	onSwitchToSignIn,
}: {
	onSwitchToSignIn: () => void;
}) {
	const { t } = useTranslation("auth");
	const navigate = useNavigate({ from: "/" });
	const signUpSchema = useSignUpSchema();
	const { isPending } = authClient.useSession();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name || value.email.split("@")[0],
				},
				{
					onSuccess: () => {
						navigate({ to: "/dashboard" });
						toast.success(t("signUp.success"));
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				},
			);
		},
		validators: {
			onSubmit: signUpSchema,
		},
	});


	if (isPending) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-background">
			{/* Left side - Form */}
			<div className="flex w-full flex-col p-8 lg:w-[45%] lg:p-12">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<LogoIcon className="size-8" />
					<span className="font-semibold text-xl">Pampas</span>
				</div>

				{/* Main content - centered vertically and horizontally */}
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						<h1 className="mb-2 font-bold text-2xl lg:text-3xl">
							{t("signUp.emailForm.title")}
						</h1>
						<p className="mb-8 text-muted-foreground">
							{t("signUp.emailForm.subtitle")}
						</p>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
							className="space-y-4"
						>
							<form.Field name="email">
								{(field) => (
									<div className="space-y-2">
										<Label htmlFor={field.name}>{t("signUp.email")}</Label>
										<Input
											id={field.name}
											name={field.name}
											type="email"
											placeholder="you@example.com"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11"
										/>
										{field.state.meta.errors.map((error) => (
											<p key={error?.message} className="text-red-500 text-sm">
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>

							<form.Field name="password">
								{(field) => (
									<div className="space-y-2">
										<Label htmlFor={field.name}>{t("signUp.password")}</Label>
										<PasswordInput
											id={field.name}
											name={field.name}
											placeholder="••••••••••••"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className="h-11"
											showStrengthMeter
										/>
										{field.state.meta.errors.map((error) => (
											<p key={error?.message} className="text-red-500 text-sm">
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>

							<form.Subscribe>
								{(state) => (
									<Button
										type="submit"
										className="h-11 w-full bg-primary hover:bg-primary/90"
										disabled={!state.canSubmit || state.isSubmitting}
									>
										{state.isSubmitting
											? t("signUp.submitting")
											: t("signUp.emailForm.submit")}
									</Button>
								)}
							</form.Subscribe>
						</form>

						{/* Divider */}
						<div className="flex items-center gap-4 py-2">
							<div className="h-px flex-1 bg-border" />
							<span className="text-muted-foreground text-sm">
								{t("signUp.or")}
							</span>
							<div className="h-px flex-1 bg-border" />
						</div>

						{/* Already have account */}
						<div className="text-center">
							<span className="text-muted-foreground text-sm">
								{t("signUp.alreadyHaveAccount")}{" "}
							</span>
							<button
								type="button"
								onClick={onSwitchToSignIn}
								className="font-medium text-primary text-sm hover:underline"
							>
								{t("signUp.logIn")}
							</button>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-muted-foreground text-sm">
					{t("signUp.termsPrefix")}{" "}
					<a href="/terms" className="text-primary hover:underline">
						{t("signUp.termsOfService")}
					</a>
					.
				</div>
			</div>

			{/* Right side - Image */}
			<div className="relative hidden lg:block lg:w-[55%]">
				<img
					src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
					alt="Woman shopping"
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
