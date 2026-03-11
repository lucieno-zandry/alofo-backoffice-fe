import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTransactionDetailStore } from "~/hooks/use-transaction-detail-store";

export type TransactionInformationsPanelViewProps = {
    informations: Record<string, any>;
    expanded: boolean;
    onToggle: () => void;
};

export function TransactionInformationsPanelView({
    informations,
    expanded,
    onToggle,
}: TransactionInformationsPanelViewProps) {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="py-3 px-4">
                <button
                    onClick={onToggle}
                    className="flex items-center justify-between w-full text-left"
                >
                    <CardTitle className="text-sm font-medium text-zinc-300">
                        Raw Payment Data
                    </CardTitle>
                    {expanded ? (
                        <ChevronDown className="h-4 w-4 text-zinc-500" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-zinc-500" />
                    )}
                </button>
            </CardHeader>
            {expanded && (
                <CardContent className="pt-0">
                    <pre className="text-xs text-zinc-400 bg-zinc-950 rounded-md p-4 overflow-auto max-h-64 font-mono leading-relaxed">
                        {JSON.stringify(informations, null, 2)}
                    </pre>
                </CardContent>
            )}
        </Card>
    );
}

export default function TransactionInformationsPanel() {
    const { transaction, informationsExpanded, toggleInformations } =
        useTransactionDetailStore();
    if (!transaction?.informations) return null;

    return (
        <TransactionInformationsPanelView
            informations={transaction.informations}
            expanded={informationsExpanded}
            onToggle={toggleInformations}
        />
    );
}