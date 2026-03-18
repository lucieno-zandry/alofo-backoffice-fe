// ~/components/shipments/ShipmentsPagination.tsx
import { Button } from '~/components/ui/button';
import { useShipmentsStore } from '~/hooks/use-shipments-store';

// --- DUMB COMPONENT (View) ---
type ShipmentsPaginationViewProps = {
    currentPage: number;
    totalPages: number;
    total: number;
    perPage: number;
    onPageChange: (page: number) => void;
};

export function ShipmentsPaginationView({ currentPage, totalPages, total, perPage, onPageChange }: ShipmentsPaginationViewProps) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

    return (
        <div className="flex items-center justify-between mt-4 px-2">
            <div className="text-sm text-zinc-400">
                Showing <span className="font-medium text-zinc-200">{startItem}</span> to{' '}
                <span className="font-medium text-zinc-200">{endItem}</span> of{' '}
                <span className="font-medium text-zinc-200">{total}</span> shipments
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="border-zinc-800 bg-transparent hover:bg-zinc-900"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="border-zinc-800 bg-transparent hover:bg-zinc-900"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

// --- SMART COMPONENT (Container) ---
export function ShipmentsPagination() {
    const pagination = useShipmentsStore((state) => state.pagination);
    const setPage = useShipmentsStore((state) => state.setPage);

    return (
        <ShipmentsPaginationView
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            total={pagination.total}
            perPage={pagination.perPage}
            onPageChange={setPage}
        />
    );
}