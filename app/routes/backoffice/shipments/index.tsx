import { useEffect } from 'react';
import UpdateShipmentSheet from '~/components/orders/update-shipment-sheet';
import { CancelShipmentDialog } from '~/components/shipments/cancel-shipment-dialog';
import { ShipmentsView } from '~/components/shipments/shipments-view';
import { useShipmentsStore } from '~/hooks/use-shipments-store';
import { useShipmentsUrlSync } from '~/hooks/use-shipments-url-sync';

export default function ShipmentsManager() {
    const { updatingShipment, setUpdatingShipment } = useShipmentsStore();
    const { syncFromUrl } = useShipmentsUrlSync();

    // Initialize from URL on mount
    useEffect(() => {
        syncFromUrl();
    }, []);

    return (
        <>
            <ShipmentsView />

            <UpdateShipmentSheet
                open={!!updatingShipment}
                onOpenChange={(open) => !open && setUpdatingShipment(null)}
                shipment={updatingShipment}
                onSuccess={() => useShipmentsStore.getState().fetchShipments()}
            />

            <CancelShipmentDialog onSuccess={() => useShipmentsStore.getState().fetchShipments()} />
        </>
    );
}