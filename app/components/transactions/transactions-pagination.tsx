import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTransactionsListStore } from "~/hooks/use-transactions-list-store";

export type TransactionsPaginationViewProps = {
  from: number;
  to: number;
  total: number;
  page: number;
  lastPage: number;
  onPrev: () => void;
  onNext: () => void;
};

export function TransactionsPaginationView({
  from, to, total, page, lastPage, onPrev, onNext,
}: TransactionsPaginationViewProps) {
  return (
    <div className="flex items-center justify-between text-sm text-zinc-500">
      <span>
        Showing{" "}
        <span className="text-zinc-300 font-medium">{from}–{to}</span> of{" "}
        <span className="text-zinc-300 font-medium">{total}</span>
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          disabled={page <= 1}
          className="h-8 w-8 text-zinc-500 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs px-2">
          {page} / {lastPage}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={page >= lastPage}
          className="h-8 w-8 text-zinc-500 hover:text-white disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function TransactionsPagination() {
  const { pagination, setPage } = useTransactionsListStore();
  const { from, to, total, page, lastPage } = pagination;

  return (
    <TransactionsPaginationView
      from={from}
      to={to}
      total={total}
      page={page}
      lastPage={lastPage}
      onPrev={() => setPage(page - 1)}
      onNext={() => setPage(page + 1)}
    />
  );
}