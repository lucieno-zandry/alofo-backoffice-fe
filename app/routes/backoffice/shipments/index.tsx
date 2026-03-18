// ~/components/shipments/ShipmentsManager.tsx
import { useEffect, useState } from 'react';
import UpdateShipmentSheet from '~/components/orders/update-shipment-sheet';
import { CancelShipmentDialog } from '~/components/shipments/cancel-shipment-dialog';
import { ShipmentsView } from '~/components/shipments/shipments-view';
import { useShipmentsStore } from '~/hooks/use-shipments-store';

export default function ShipmentsManager() {
    const { fetchShipments, updatingShipment, setUpdatingShipment } = useShipmentsStore();

    // Initial load
    useEffect(() => {
        fetchShipments();
    }, []);

    return (
        <>
            <ShipmentsView />

            <UpdateShipmentSheet
                open={!!updatingShipment}
                onOpenChange={(open) => !open && setUpdatingShipment(null)}
                shipment={updatingShipment}
                onSuccess={fetchShipments}
            />

            <CancelShipmentDialog onSuccess={fetchShipments} />
        </>
    );
}