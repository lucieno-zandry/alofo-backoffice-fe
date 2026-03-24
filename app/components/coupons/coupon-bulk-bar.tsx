// ~/components/coupons/coupon-bulk-bar.tsx
import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

export type CouponBulkBarProps = {
  count: number;
  onClear: () => void;
  onBulkDelete: () => void;
};

export function CouponBulkBar({ count, onClear, onBulkDelete }: CouponBulkBarProps) {
  if (count === 0) return null;

  return (
    <div className="mx-4 mb-2 flex items-center justify-between gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
      <span className="text-xs font-medium">
        {count} selected
      </span>
      <div className="flex gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs"
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="h-6 text-xs gap-1"
          onClick={onBulkDelete}
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </div>
    </div>
  );
}