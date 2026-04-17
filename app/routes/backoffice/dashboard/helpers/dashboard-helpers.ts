import * as date from "~/lib/format-date";
import formatPrice from "~/lib/format-price";
import getLanguage from "~/lib/get-language";

export function formatCurrency(amount: number): string {
    return formatPrice(amount);
}

export function formatDate(iso: string): string {
    return date.formatDate(iso);
}

export function formatShortDate(iso: string): string {
    return new Intl.DateTimeFormat(getLanguage(), {
        month: "short",
        day: "numeric",
    }).format(new Date(iso));
}

export function truncateUuid(uuid: string): string {
    return uuid.slice(0, 8).toUpperCase();
}

export function getPaymentStatus(
    transactions?: { status: string; type: string }[]
): "SUCCESS" | "PENDING" | "FAILED" | "NONE" {
    if (!transactions?.length) return "NONE";
    const payment = transactions.find((t) => t.type === "PAYMENT");
    return (payment?.status as any) ?? "NONE";
}

export function getShipmentStatus(
    shipments?: { status: string; is_active: boolean }[]
): "PROCESSING" | "SHIPPED" | "DELIVERED" | "PENDING" | "NONE" {
    if (!shipments?.length) return "NONE";
    const active = shipments.find((s) => s.is_active);
    return (active?.status as any) ?? (shipments[0]?.status as any) ?? "NONE";
}