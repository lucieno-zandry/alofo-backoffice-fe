import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Filter, Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import type { OrdersQueryParams } from "~/types/orders";
import useDebounce from "~/hooks/use-debounce";
import Button from "../custom-ui/button";

export type OrdersFiltersViewProps = {
    search: string;
    dateFrom: string;
    dateTo: string;
    paymentStatus: string;
    shipmentStatus: string;
    onSearchChange: (value: string) => void;
    onDateFromChange: (value: string) => void;
    onDateToChange: (value: string) => void;
    onPaymentStatusChange: (value: string) => void;
    onShipmentStatusChange: (value: string) => void;
    onFilterClick: () => void;
};

export function OrdersFiltersView({
    search,
    dateFrom,
    dateTo,
    paymentStatus,
    shipmentStatus,
    onSearchChange,
    onDateFromChange,
    onDateToChange,
    onPaymentStatusChange,
    onShipmentStatusChange,
    onFilterClick
}: OrdersFiltersViewProps) {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by UUID or customer email..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
            <Input
                type="date"
                placeholder="From"
                className="w-auto"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
            />
            <Input
                type="date"
                placeholder="To"
                className="w-auto"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
            />
            <Select value={paymentStatus} onValueChange={onPaymentStatusChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Payments" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="success">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
            </Select>
            <Select value={shipmentStatus} onValueChange={onShipmentStatusChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Shipments" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Shipments</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={onFilterClick}>
                <Filter className="h-4 w-4" />
            </Button>
        </div>
    );
}

export type OrdersFiltersProps = {
    updateParams: (updates: Partial<OrdersQueryParams>) => void;
    searchParams: URLSearchParams;
    onFilterClick: () => void;
};

export default function OrdersFilters({ updateParams, searchParams, onFilterClick }: OrdersFiltersProps) {
    const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
    const debouncedSearch = useDebounce(searchInput, 500);

    const dateFrom = searchParams.get("date_from") || "";
    const dateTo = searchParams.get("date_to") || "";
    const paymentStatus = searchParams.get("payment_status") || "all";
    const shipmentStatus = searchParams.get("shipment_status") || "all";

    // Only update URL if the debounced value actually changed
    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";
        if (debouncedSearch !== currentSearch) {
            updateParams({ search: debouncedSearch || undefined });
        }
    }, [debouncedSearch, searchParams, updateParams]);

    const handleSearchChange = (value: string) => {
        setSearchInput(value);
    };

    const handleDateFromChange = (value: string) => {
        updateParams({ date_from: value });
    };

    const handleDateToChange = (value: string) => {
        updateParams({ date_to: value });
    };

    const handlePaymentStatusChange = (value: string) => {
        updateParams({ payment_status: value === "all" ? "" : value });
    };

    const handleShipmentStatusChange = (value: string) => {
        updateParams({ shipment_status: value === "all" ? "" : value });
    };

    return (
        <OrdersFiltersView
            search={searchInput}
            dateFrom={dateFrom}
            dateTo={dateTo}
            paymentStatus={paymentStatus}
            shipmentStatus={shipmentStatus}
            onSearchChange={handleSearchChange}
            onDateFromChange={handleDateFromChange}
            onDateToChange={handleDateToChange}
            onPaymentStatusChange={handlePaymentStatusChange}
            onShipmentStatusChange={handleShipmentStatusChange}
            onFilterClick={onFilterClick}
        />
    );
}