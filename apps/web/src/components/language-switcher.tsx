import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type SupportedLanguage, supportedLanguages } from "@/lib/i18n";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {
	const { t, i18n } = useTranslation("common");

	const handleLanguageChange = (lang: SupportedLanguage) => {
		i18n.changeLanguage(lang);
	};

	const currentLanguage = i18n.language as SupportedLanguage;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
				<Globe className="h-4 w-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-card">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{t("language.select")}</DropdownMenuLabel>
					{supportedLanguages.map((lang) => (
						<DropdownMenuItem
							key={lang}
							onClick={() => handleLanguageChange(lang)}
							className={currentLanguage === lang ? "bg-accent" : ""}
						>
							{t(`language.${lang}`)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
