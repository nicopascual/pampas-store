import { channelsRouter } from "./channels";
import { configRouter } from "./config";
import { currenciesRouter } from "./currencies";
import { localesRouter } from "./locales";
import { themesRouter } from "./themes";

export const settingsRouter = {
	channels: channelsRouter,
	locales: localesRouter,
	currencies: currenciesRouter,
	config: configRouter,
	themes: themesRouter,
};
