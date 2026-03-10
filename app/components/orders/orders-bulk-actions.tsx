import { Button } from "~/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { bulkUpdateShipmentStatus } from "~/api/http-requests";
import { useOrdersStore } from "~/hooks/use-orders-store";
import { useSearchParams } from "react-router";
import toOrderQueryParams from "~/lib/to-order-query-params";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

export type OrdersBulkActionsViewProps = {
    selectedCount: number;
    onClearSelection: () => void;
    onUpdateStatus: (status: string) => Promise<void>;
    onExport: () => void;
    isUpdating: boolean;
};

export function OrdersBulkActionsView({
    selectedCount,
    onClearSelection,
    onUpdateStatus,
    onExport,
    isUpdating,
}: OrdersBulkActionsViewProps) {
    const [status, setStatus] = useState<string>("");

    const handleApply = async () => {
        if (!status) return;
        await onUpdateStatus(status);
        setStatus("");
    };

    return (
        <AnimatePresence>
            {selectedCount > 0 && (
                <motion.div
                    initial={{ y: 100, x: "-50%", opacity: 0 }}
                    animate={{ y: 0, x: "-50%", opacity: 1 }}
                    exit={{ y: 100, x: "-50%", opacity: 0 }}
                    className="fixed bottom-8 left-1/2 z-50 flex items-center gap-4 bg-background border shadow-2xl rounded-full px-6 py-3 min-w-[500px]"
                >
                    <div className="flex items-center gap-3 border-r pr-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {selectedCount}
                        </div>
                        <span className="text-sm font-medium">Selected</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onClearSelection}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 flex-1">
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="h-9 w-[180px] rounded-full border-none bg-muted/50">
                                <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            size="sm"
                            className="rounded-full h-9 px-4"
                            disabled={!status || isUpdating}
                            onClick={handleApply}
                        >
                            {isUpdating ? "Updating..." : "Apply"}
                        </Button>
                    </div>

                    <Button variant="outline" size="sm" className="rounded-full h-9 gap-2" onClick={onExport}>
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export type OrdersBulkActionsProps = {
    selectedIds: Set<string>;
    onClearSelection: () => void;
};

export default function OrdersBulkActions({ selectedIds, onClearSelection }: OrdersBulkActionsProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const { fetchOrders } = useOrdersStore();
    const [searchParams] = useSearchParams();

    const handleUpdateStatus = async (status: string) => {
        setIsUpdating(true);
        try {
            const response = await bulkUpdateShipmentStatus(Array.from(selectedIds), status.toUpperCase());

            if (response.data && response.data.updated > 0)
                toast.success(`${response.data.updated} Shipment(s) updated successfully`);

            response.data?.errors.forEach((error) => {
                toast.error(error);
            })

            toast.success(`Shipment status updated to ${status}`);
            onClearSelection(); // optionally clear after success
            await fetchOrders(toOrderQueryParams(searchParams))
        } catch (error) {
            toast.error("Failed to update shipment status");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleExport = () => {
        // TODO: implement export (could use selectedIds)
        toast.info("Export selected – coming soon");
    };

    return (
        <OrdersBulkActionsView
            selectedCount={selectedIds.size}
            onClearSelection={onClearSelection}
            onUpdateStatus={handleUpdateStatus}
            onExport={handleExport}
            isUpdating={isUpdating}
        />
    );
}