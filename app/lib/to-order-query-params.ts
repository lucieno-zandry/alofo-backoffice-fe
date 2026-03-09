import { DEFAULT_MAX_TOTAL } from "~/components/orders/orders-filter-dialog";

export default function (params: URLSearchParams) {
    const page = Number(params.get("page")) || 1;
    const per_page = Number(params.get("per_page")) || 10;
    const sort = params.get("sort") || "-created_at";
    const search = params.get("search") || "";
    const date_from = params.get("date_from") || "";
    const date_to = params.get("date_to") || "";
    const payment_status = params.get("payment_status") || "";
    const shipment_status = params.get("shipment_status") || "";
    const total_min = params.get('total_min') || "0";
    const total_max = params.get('total_max') || DEFAULT_MAX_TOTAL.toString();


    return {
        page,
        per_page,
        sort,
        search,
        date_from,
        date_to,
        payment_status,
        shipment_status,
        total_min: parseFloat(total_min),
        total_max: parseFloat(total_max),
    };
}