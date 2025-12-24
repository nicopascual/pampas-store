import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { adminAuthClient } from "@/lib/admin-auth-client";
import { useSignInSchema } from "@/lib/zod-i18n";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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

export default function AdminSignInForm() {
	const { t } = useTranslation("auth");
	const navigate = useNavigate();
	const signInSchema = useSignInSchema();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await adminAuthClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						navigate({ to: "/admin/dashboard" });
						toast.success(t("admin.signIn.success"));
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				},
			);
		},
		validators: {
			onSubmit: signInSchema,
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/40">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-lg">
				{/* Logo & Header */}
				<div className="text-center">
					<div className="mb-4 flex items-center justify-center gap-2">
						<LogoIcon className="size-10" />
						<span className="font-semibold text-2xl">Pampas</span>
					</div>
					<h1 className="font-bold text-2xl">{t("admin.signIn.title")}</h1>
					<p className="mt-2 text-muted-foreground">
						{t("admin.signIn.subtitle")}
					</p>
				</div>

				{/* Form */}
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
								<Label htmlFor={field.name}>{t("signIn.email")}</Label>
								<Input
									id={field.name}
									name={field.name}
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									className="h-12"
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
								<Label htmlFor={field.name}>{t("signIn.password")}</Label>
								<Input
									id={field.name}
									name={field.name}
									type="password"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									className="h-12"
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
								className="h-12 w-full"
								disabled={!state.canSubmit || state.isSubmitting}
							>
								{state.isSubmitting
									? t("signIn.submitting")
									: t("signIn.submit")}
							</Button>
						)}
					</form.Subscribe>
				</form>

				{/* Footer */}
				<p className="text-center text-muted-foreground text-sm">
					{t("admin.signIn.accessRestricted")}
				</p>
			</div>
		</div>
	);
}
