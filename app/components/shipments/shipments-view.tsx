import { ShipmentsFilters } from "./shipment-filters";
import { ShipmentsPagination } from "./shipments-pagination";
import { ShipmentsTable } from "./shipments-table";


export function ShipmentsView() {
    return (
        <div className="space-y-6 bg-background/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-zinc-800/50">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold tracking-tight">Shipments</h2>
            </div>

            <ShipmentsFilters />
            <ShipmentsTable />
            <ShipmentsPagination />
        </div>
    );
}