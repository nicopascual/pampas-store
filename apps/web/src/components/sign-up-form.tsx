import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";
import { Button } from "./ui/button";

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

function MailIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
			<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
		</svg>
	);
}

function GoogleIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				fill="#EA4335"
			/>
		</svg>
	);
}

function FacebookIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	);
}

function AppleIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
		</svg>
	);
}

export default function SignUpForm({
	onSwitchToSignIn,
}: {
	onSwitchToSignIn: () => void;
}) {
	const { t } = useTranslation("auth");
	const { isPending } = authClient.useSession();
	const navigate = useNavigate();

	if (isPending) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen">
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
							{t("signUp.title")}
						</h1>
						<p className="mb-8 text-muted-foreground">{t("signUp.subtitle")}</p>

						<div className="space-y-3">
							{/* Sign Up with Email */}
							<Link to="/sign-up/email" className="block">
								<Button
									variant="outline"
									className="h-12 w-full justify-center gap-3 border-2 border-foreground"
								>
									<MailIcon className="size-5" />
									{t("signUp.signUpWithEmail")}
								</Button>
							</Link>

							{/* Sign in with Google */}
							<Button
								variant="outline"
								className="h-12 w-full justify-center gap-3"
								onClick={() => toast.info(t("signUp.comingSoon"))}
							>
								<GoogleIcon className="size-5" />
								{t("signUp.signInWithGoogle")}
							</Button>

							{/* Sign in with Facebook */}
							<Button
								className="h-12 w-full justify-center gap-3 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
								onClick={() => toast.info(t("signUp.comingSoon"))}
							>
								<FacebookIcon className="size-5" />
								{t("signUp.signInWithFacebook")}
							</Button>

							{/* Sign in with Apple */}
							<Button
								className="h-12 w-full justify-center gap-3 bg-black text-white hover:bg-black/90"
								onClick={() => toast.info(t("signUp.comingSoon"))}
							>
								<AppleIcon className="size-5" />
								{t("signUp.signInWithApple")}
							</Button>

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
					src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1976&auto=format&fit=crop"
					alt="Storefront"
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
