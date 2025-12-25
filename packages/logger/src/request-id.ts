import { nanoid } from "nanoid";

/**
 * Generates a unique request ID using nanoid(21)
 */
export function generateRequestId(): string {
	return nanoid(21);
}

/**
 * Extracts request ID from x-request-id header or generates a new one
 */
export function extractOrGenerateRequestId(
	headers: Record<string, string | undefined>,
): string {
	const existingId = headers["x-request-id"];
	return existingId || generateRequestId();
}
