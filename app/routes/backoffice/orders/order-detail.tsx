import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getOrder } from "~/api/http-requests";
import type { LoaderFunctionArgs } from "react-router";
import { useOrderDetailStore } from "~/hooks/use-order-detail-store";
import OrderDetailView from "~/components/order-detail/order-detail-view";

export async function clientLoader({ params }: LoaderFunctionArgs) {
    const response = await getOrder(params.uuid!);
    return response.data?.order;
}

export default function OrderDetailPage() {
    const order = useLoaderData<typeof clientLoader>();
    const { setOrder } = useOrderDetailStore();

    useEffect(() => {
        if (order) setOrder(order);
    }, [order, setOrder]);

    if (!order) return <div>Order not found</div>;

    return <OrderDetailView />;
}