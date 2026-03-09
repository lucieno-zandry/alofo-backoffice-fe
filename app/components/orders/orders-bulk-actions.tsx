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

    if (selectedCount === 0) return null;

    return (
        <div className="flex items-center justify-between bg-muted/50 px-4 py-2 rounded-lg border">
            <div className="text-sm">
                <span className="font-medium">{selectedCount}</span> selected
                <Button
                    variant="link"
                    className="px-2 text-xs"
                    onClick={onClearSelection}
                >
                    Clear
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <Select value={status} onValueChange={setStatus} disabled={isUpdating}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Update shipment status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    size="sm"
                    onClick={handleApply}
                    disabled={!status || isUpdating}
                >
                    {isUpdating ? "Updating..." : "Apply"}
                </Button>
                <Button size="sm" variant="outline" onClick={onExport}>
                    Export
                </Button>
            </div>
        </div>
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