import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switcher";
import UserMenu from "./user-menu";

export default function Header() {
	const { t } = useTranslation("common");

	const links = [
		{ to: "/", label: t("navigation.home") },
		{ to: "/dashboard", label: t("navigation.dashboard") },
	] as const;

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} to={to}>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<LanguageSwitcher />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
