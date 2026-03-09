import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useOrderDetailStore } from "~/hooks/use-order-detail-store";
import formatPrice from "~/lib/format-price";
import { Separator } from "~/components/ui/separator";

export type OrderSummaryViewProps = {
    user: { name: string; email: string; avatarUrl?: string } | null;
    address: Address;
    coupon: Order['coupon_snapshot'];
    couponDiscount: number;
    total: number;
};

export function OrderSummaryView({
    user,
    address,
    coupon,
    couponDiscount,
    total,
}: OrderSummaryViewProps) {
    return (
        <div className="space-y-6">
            {/* Financial Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>{formatPrice(total + couponDiscount)}</span>
                        </div>
                        {coupon && (
                            <div className="flex justify-between text-emerald-600">
                                <span>Discount ({coupon.code})</span>
                                <span>-{formatPrice(couponDiscount)}</span>
                            </div>
                        )}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium text-base">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Customer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-medium text-sm">{user.name}</span>
                                <span className="text-sm text-muted-foreground">{user.email}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No customer data</p>
                    )}
                </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <address className="not-italic text-sm text-muted-foreground space-y-1">
                        <p className="font-medium text-foreground">{address.fullname}</p>
                        <p>{address.line1}</p>
                        {address.line2 && <p>{address.line2}</p>}
                        {address.line3 && <p>{address.line3}</p>}
                        <p className="pt-2">{address.phone_number}</p>
                    </address>
                </CardContent>
            </Card>
        </div>
    );
}

// ===== CONTAINER =====
export default function OrderSummary() {
    const { order } = useOrderDetailStore();
    if (!order) return null;

    const user = order.user
        ? {
            name: order.user.name,
            email: order.user.email,
            avatarUrl: order.user.avatar_image?.url,
        }
        : null;

    return (
        <OrderSummaryView
            user={user}
            address={order.address_snapshot}
            coupon={order.coupon_snapshot}
            couponDiscount={order.coupon_discount_applied}
            total={order.total}
        />
    );
}