

type GetCurrency = (() => string) & {
    symbol: () => string;
};

const getCurrency: GetCurrency = () => {
    return "EUR";
}

getCurrency.symbol = () => {
    return "€"
}

export default getCurrency;