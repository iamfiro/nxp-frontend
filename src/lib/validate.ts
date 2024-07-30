/**
 * Removes all non-numeric characters from a string.
 *
 * @param input - The input string to be sanitized.
 * @returns The sanitized string containing only numeric characters.
 */
export const sanitizeNumericInput = (input: string): string => {
    return input.replace(/\D/g, "");
};
