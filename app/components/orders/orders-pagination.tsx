import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";
import { useOrdersStore } from "~/hooks/use-orders-store";

export type OrdersPaginationViewProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
};

export function OrdersPaginationView({ currentPage, lastPage, onPageChange }: OrdersPaginationViewProps) {
    if (lastPage <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(page);
                            }}
                            isActive={page === currentPage}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < lastPage) onPageChange(currentPage + 1);
                        }}
                        className={currentPage === lastPage ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

// Default component
export type OrdersPaginationProps = {
    onPageChange: (page: number) => void;
};

export default function OrdersPagination({ onPageChange }: OrdersPaginationProps) {
    const { pagination } = useOrdersStore();
    return (
        <OrdersPaginationView
            currentPage={pagination.currentPage}
            lastPage={pagination.lastPage}
            onPageChange={onPageChange}
        />
    );
}