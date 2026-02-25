import getCurrency from "./get-currency";

const formatPrice = (cents: number) =>
    cents.toLocaleString("fr-FR", {
        style: "currency",
        currency: getCurrency(),
        maximumFractionDigits: 0,
    });

export default formatPrice;