import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { bulkUpdateShipmentStatus } from "~/api/http-requests";
import { useOrdersStore } from "~/hooks/use-orders-store";
import { useSearchParams } from "react-router";
import toOrderQueryParams from "~/lib/to-order-query-params";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "~/components/ui/sheet";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

type UpdateShipmentSheetViewProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
    status: string;
    onStatusChange: (value: string) => void;
    carrier: string;
    onCarrierChange: (value: string) => void;
    trackingNumber: string;
    onTrackingNumberChange: (value: string) => void;
    estimatedDelivery: string;
    onEstimatedDeliveryChange: (value: string) => void;
    shippedDate: string;
    onShippedDateChange: (value: string) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
};

export function UpdateShipmentSheetView({
    open,
    onOpenChange,
    order,
    carrier,
    estimatedDelivery,
    onCarrierChange,
    isSubmitting,
    onEstimatedDeliveryChange,
    onShippedDateChange,
    onStatusChange,
    onSubmit,
    onTrackingNumberChange,
    shippedDate,
    status,
    trackingNumber }: UpdateShipmentSheetViewProps) {
    if (!order) return null;

    const latestShipment = order.shipments?.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
    
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md border-l shadow-2xl">
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-xl">Update Shipment</SheetTitle>
                    <p className="text-sm text-muted-foreground">Order ID: {order?.uuid.slice(0, 12)}...</p>
                </SheetHeader>

                <div className="space-y-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={onStatusChange}>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PROCESSING">Processing</SelectItem>
                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {(status === "SHIPPED" || latestShipment?.status === "SHIPPED") && (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="carrier">Carrier</Label>
                                <Input
                                    id="carrier"
                                    value={carrier}
                                    onChange={(e) => onCarrierChange(e.target.value)}
                                    placeholder="e.g., DHL, FedEx"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tracking">Tracking Number</Label>
                                <Input
                                    id="tracking"
                                    value={trackingNumber}
                                    onChange={(e) => onTrackingNumberChange(e.target.value)}
                                    placeholder="Tracking number"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="shipped-date">Shipped Date</Label>
                                <Input
                                    id="shipped-date"
                                    type="date"
                                    value={shippedDate}
                                    onChange={(e) => onShippedDateChange(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {status === "DELIVERED" && (
                        <div className="grid gap-2">
                            <Label htmlFor="estimated-delivery">Estimated Delivery</Label>
                            <Input
                                id="estimated-delivery"
                                type="date"
                                value={estimatedDelivery}
                                onChange={(e) => onEstimatedDeliveryChange(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
                    <Button className="w-full h-11 rounded-xl" onClick={onSubmit}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export type UpdateShipmentSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
    onSuccess?: () => void;
};

export default function ({
    open,
    onOpenChange,
    order,
    onSuccess,
}: UpdateShipmentSheetProps) {
    const [status, setStatus] = useState("PROCESSING");
    const [carrier, setCarrier] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [estimatedDelivery, setEstimatedDelivery] = useState("");
    const [shippedDate, setShippedDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { fetchOrders } = useOrdersStore();
    const [searchParams] = useSearchParams();

    // Load current shipment data when order changes
    useEffect(() => {
        if (order && open) {
            const latest = order.shipments?.sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )[0];
            if (latest) {
                setStatus(latest.status);
                setCarrier(latest.data?.carrier || "");
                setTrackingNumber(latest.data?.tracking_number || "");
                setEstimatedDelivery(latest.data?.estimated_delivery || "");
                setShippedDate(latest.data?.shipped_date || "");
            } else {
                // No shipments yet – default to PROCESSING
                setStatus("PROCESSING");
                setCarrier("");
                setTrackingNumber("");
                setEstimatedDelivery("");
                setShippedDate("");
            }
        }
    }, [order, open]);

    const handleSubmit = async () => {
        if (!order) return;
        setIsSubmitting(true);
        try {
            // Prepare data object – only include fields that are not empty
            const data: Record<string, any> = {};
            if (carrier) data.carrier = carrier;
            if (trackingNumber) data.tracking_number = trackingNumber;
            if (estimatedDelivery) data.estimated_delivery = estimatedDelivery;
            if (shippedDate) data.shipped_date = shippedDate;

            const response = await bulkUpdateShipmentStatus([order.uuid], status.toUpperCase(), data);

            if (response.data && response.data.updated > 0)
                toast.success(`${response.data.updated} Shipment(s) updated successfully`);

            response.data?.errors.forEach((error) => {
                toast.error(error);
            })

            onOpenChange(false);
            onSuccess?.();
            await fetchOrders(toOrderQueryParams(searchParams));
        } catch (error) {
            toast.error("Failed to update shipment");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <UpdateShipmentSheetView
            open={open}
            onOpenChange={onOpenChange}
            order={order}
            status={status}
            onStatusChange={setStatus}
            carrier={carrier}
            onCarrierChange={setCarrier}
            trackingNumber={trackingNumber}
            onTrackingNumberChange={setTrackingNumber}
            estimatedDelivery={estimatedDelivery}
            onEstimatedDeliveryChange={setEstimatedDelivery}
            shippedDate={shippedDate}
            onShippedDateChange={setShippedDate}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
        />
    );
}