import getCurrency from "./get-currency";

const formatPrice = (price?: number | null) => {
    if (typeof price !== 'number' || isNaN(price)) {
        return '—'; // or '$0.00', 'N/A' – choose what fits your UI
    }

    return price.toLocaleString("fr-FR", {
        style: "currency",
        currency: getCurrency(),
        maximumFractionDigits: 0,
    });
}

export default formatPrice;