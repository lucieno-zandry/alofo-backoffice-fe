import getCurrency from "./get-currency";

const formatPrice = (price?: number | null) => {
    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;

    if (typeof parsedPrice != "number" || isNaN(parsedPrice)) {
        return '—';
    }

    return parsedPrice.toLocaleString("fr-FR", {
        style: "currency",
        currency: getCurrency(),
        maximumFractionDigits: 0,
    });
}

export default formatPrice;