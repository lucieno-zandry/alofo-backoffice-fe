// ~/components/variant-picker/variant-picker-footer.tsx
import { ChevronLeft, ChevronRight, Package, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export type VariantPickerFooterProps = {
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
  } | null;
  onPageChange: (page: number) => void;
  loading: boolean;

  // Selection summary
  selectedCount: number;
  onClearSelection: () => void;
  onSelectAll: () => void;
  totalVariantsOnPage: number;

  // Confirm
  onConfirm: () => void;
  confirming: boolean;
  confirmLabel?: string;
};

export function VariantPickerFooter({
  meta,
  onPageChange,
  loading,
  selectedCount,
  onClearSelection,
  onSelectAll,
  totalVariantsOnPage,
  onConfirm,
  confirming,
  confirmLabel = "Assign selected variants",
}: VariantPickerFooterProps) {
  return (
    <div className="shrink-0 border-t bg-background">
      {/* Selection summary bar */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <Badge className="gap-1 text-xs bg-primary/10 text-primary border-0 hover:bg-primary/10">
              <Package className="h-3 w-3" />
              {selectedCount} variant{selectedCount !== 1 ? "s" : ""} selected
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={onSelectAll}
            >
              Select all on page
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-muted-foreground"
              onClick={onClearSelection}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Pagination + confirm */}
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Pagination */}
        <div className="flex items-center gap-2">
          {meta && (
            <>
              <span className="text-xs text-muted-foreground">
                {meta.from}–{meta.to} of {meta.total} products
              </span>
              {meta.last_page > 1 && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={meta.current_page <= 1 || loading}
                    onClick={() => onPageChange(meta.current_page - 1)}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <span className="text-xs font-medium min-w-[40px] text-center">
                    {meta.current_page} / {meta.last_page}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={meta.current_page >= meta.last_page || loading}
                    onClick={() => onPageChange(meta.current_page + 1)}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Confirm button */}
        <Button
          onClick={onConfirm}
          disabled={selectedCount === 0 || confirming}
          className="gap-2 shrink-0"
        >
          {confirming && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {selectedCount > 0
            ? `${confirmLabel} (${selectedCount})`
            : confirmLabel}
        </Button>
      </div>
    </div>
  );
}