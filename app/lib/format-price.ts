const formatPrice = (cents: number) =>
    (cents / 100).toLocaleString("fr-MG", {
        style: "currency",
        currency: "MGA",
        maximumFractionDigits: 0,
    });

export default formatPrice;