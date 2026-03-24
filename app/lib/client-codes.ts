export function generateCode(length = 8): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
    return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
}

export function formatCode(raw: string): string {
    // Auto-format as XXXX-XXXX if 8 chars
    const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (clean.length > 4) return `${clean.slice(0, 4)}-${clean.slice(4, 8)}`;
    return clean;
}
