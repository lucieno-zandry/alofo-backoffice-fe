import useRouterStore from "~/hooks/use-router-store";
import { useSettingsStore } from "~/routes/backoffice/settings/stores/use-settings-store";
import getLanguage from "./get-language";


type GetCurrency = (() => string) & {
    symbol: () => string;
};

export const getCurrency: GetCurrency = () => {
    const { getSetting } = useSettingsStore.getState();

    return getSetting('currency', 'EUR');
}

export function getCurrencySymbol(): string {
    const currency = getCurrency();
    const language = getLanguage();

    try {
        // Format a dummy value and extract the symbol
        const parts = new Intl.NumberFormat(language, {
            style: "currency",
            currency,
        }).formatToParts(0);

        const symbolPart = parts.find(p => p.type === "currency");
        return symbolPart ? symbolPart.value : currency;
    } catch (error) {
        // Fallback: just return the currency code itself
        return currency;
    }
}

getCurrency.symbol = getCurrencySymbol

export default getCurrency;