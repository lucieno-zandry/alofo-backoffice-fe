import MetaItem from "~/components/product-detail/meta-item";
import { CalendarDays, RefreshCw } from "lucide-react";

export function ProductMetadata({ createdAt, updatedAt }: { createdAt: string; updatedAt: string }) {
    return (
        <div className="space-y-1.5">
            <MetaItem icon={CalendarDays} label="Created" value={createdAt} />
            <MetaItem icon={RefreshCw} label="Updated" value={updatedAt} />
        </div>
    );
}
