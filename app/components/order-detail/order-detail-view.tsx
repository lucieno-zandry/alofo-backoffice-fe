import OrderDetailHeader from "./order-detail-header";
import OrderSummary from "./order-summary";
import OrderItemsTable from "./order-items-table";
import OrderPayments from "./order-payments";
import OrderShipments from "./order-shipments";
import OrderActions from "./order-actions";
import { Separator } from "~/components/ui/separator";
import OrderRefundRequests from './order-refund-requests'; // add this import

export default function OrderDetailView() {
    return (
        <div className="p-4 md:p-8 space-y-6 bg-background/80 backdrop-blur-md rounded-2xl h-full overflow-y-auto">
            <OrderDetailHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
                {/* Left Column: Main Order Data */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <OrderItemsTable />
                    </section>

                    <Separator />

                    <section>
                        <OrderShipments />
                    </section>

                    <Separator />

                    <section>
                        <OrderPayments />
                    </section>

                    {/* Add Refund Requests section */}
                    <Separator />
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Refund Requests</h2>
                        <OrderRefundRequests />
                    </section>
                </div>

                {/* Right Column: Meta, Customer, and Actions */}
                <div className="space-y-6">
                    <OrderActions />
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}