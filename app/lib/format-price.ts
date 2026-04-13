import getCurrency from "./get-currency";
import getLanguage from "./get-language";

const formatPrice = (price?: number | null) => {
    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;

    if (typeof parsedPrice != "number" || isNaN(parsedPrice)) {
        return '—';
    }

    return parsedPrice.toLocaleString(getLanguage(), {
        style: "currency",
        currency: getCurrency(),
        maximumFractionDigits: 0,
    });
}

export default formatPrice;