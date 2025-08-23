import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";
import { createRouter } from "./router";
import {
    getLocale,
    overwriteGetLocale,
    strategy,
} from "./lib/paraglide/runtime.js";

/**
 * BEGINING
 * This is to make sure locale is not pulled from a cookie to prevent weird behaviour when the language was changed manually in the cookie or in another tab. If you don't rely on cookies for locale, you can remove this line.
 */
if (strategy.includes("cookie")) {
    const inMemoryLocale = getLocale();
    overwriteGetLocale(() => inMemoryLocale);
}
/**
 * END
 */

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);