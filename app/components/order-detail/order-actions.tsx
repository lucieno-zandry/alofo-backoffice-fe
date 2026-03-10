import { useState } from "react";
import { useOrderDetailStore } from "~/hooks/use-order-detail-store";
import UpdateShipmentDialog from "~/components/orders/update-shipment-sheet";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export default function OrderActions() {
    const { order } = useOrderDetailStore();
    const [updating, setUpdating] = useState(false);

    if (!order) return null;

    return (
        <>
            <OrderActionsView
                onUpdateShipment={() => setUpdating(true)}
            />
            <UpdateShipmentDialog
                open={updating}
                onOpenChange={setUpdating}
                order={order}
            />
        </>
    );
}

export type OrderActionsViewProps = {
    onUpdateShipment: () => void;
};

export function OrderActionsView({ onUpdateShipment }: OrderActionsViewProps) {
    const handleCancel = async () => {
        if (!confirm("Are you sure you want to cancel this order?")) return;
        // TODO: implement cancel API
        toast.success("Order cancelled");
    };

    return (
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onUpdateShipment}>
                Update Shipment
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
                Cancel Order
            </Button>
        </div>
    );
}