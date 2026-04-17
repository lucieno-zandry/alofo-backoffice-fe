import { AlertTriangle, ExternalLink, CheckCheck, RefreshCw as RefundIcon } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SectionHeader } from "../section-header";
import { StatusBadge } from "../status-badge";
import { EmptyState } from "../empty-state";
import { formatCurrency, formatDate, truncateUuid } from "../../helpers/dashboard-helpers";
import type { FailedTransaction, DisputeTransaction } from "../../types/dashboard-types";

type Props = {
  failed: FailedTransaction[];
  disputes: DisputeTransaction[];
  loading: boolean;
  onRefresh: () => void;
  onMarkReviewed: (uuid: string) => void;
  onOpenRefund: (uuid: string) => void;
  lang: string;
};

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-7 w-28 rounded-lg" />
    </div>
  );
}

function FailedRow({
  tx,
  onMarkReviewed,
  onOpenRefund,
  lang,
}: {
  tx: FailedTransaction;
  onMarkReviewed: (uuid: string) => void;
  onOpenRefund: (uuid: string) => void;
  lang: string;
}) {
  return (
    <div className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-foreground">
            #{truncateUuid(tx.uuid)}
          </span>
          <StatusBadge label={tx.method} variant="neutral" />
          <span className="font-mono text-sm font-bold text-rose-500">
            {formatCurrency(tx.amount)}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {tx.user?.name ?? "Unknown"} · {formatDate(tx.created_at)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1.5 px-2.5 text-xs"
          onClick={() => onMarkReviewed(tx.uuid)}
        >
          <CheckCheck className="h-3 w-3" />
          Review
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1.5 px-2.5 text-xs text-amber-600 border-amber-500/30 hover:bg-amber-500/10 dark:text-amber-400"
          onClick={() => onOpenRefund(tx.uuid)}
        >
          <RefundIcon className="h-3 w-3" />
          Refund
        </Button>
        <Link
          to={`/${lang}/transactions/${tx.uuid}`}
          className="ml-0.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function DisputeRow({
  tx,
  onMarkReviewed,
  lang,
}: {
  tx: DisputeTransaction;
  onMarkReviewed: (uuid: string) => void;
  lang: string;
}) {
  return (
    <div className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-foreground">
            #{truncateUuid(tx.uuid)}
          </span>
          <StatusBadge label="OPEN" variant="warning" />
          <span className="font-mono text-sm font-bold text-amber-500">
            {formatCurrency(tx.amount)}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {tx.user?.name ?? "Unknown"}
          {tx.dispute_reason ? ` · ${tx.dispute_reason}` : ""}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1.5 px-2.5 text-xs"
          onClick={() => onMarkReviewed(tx.uuid)}
        >
          <CheckCheck className="h-3 w-3" />
          Resolve
        </Button>
        <Link
          to={`/${lang}/transactions/${tx.uuid}`}
          className="ml-0.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function TransactionIssuesView({
  failed,
  disputes,
  loading,
  onRefresh,
  onMarkReviewed,
  onOpenRefund,
  lang,
}: Props) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-sm">
      <div className="border-b border-border/50 p-5">
        <SectionHeader
          title="Transaction Issues"
          subtitle="Failures & open disputes"
          icon={AlertTriangle}
          iconClass="bg-rose-500/10 text-rose-600 dark:text-rose-400"
          onRefresh={onRefresh}
        />
      </div>

      <Tabs defaultValue="failed" className="w-full">
        <div className="border-b border-border/40 px-5 pt-1">
          <TabsList className="h-9 gap-1 bg-transparent p-0">
            <TabsTrigger
              value="failed"
              className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-3 pb-2 pt-1 text-xs font-medium text-muted-foreground shadow-none transition-colors data-[state=active]:border-rose-500 data-[state=active]:text-rose-600 dark:data-[state=active]:text-rose-400 data-[state=active]:shadow-none"
            >
              Failed
              {!loading && failed.length > 0 && (
                <span className="ml-1.5 rounded-full bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                  {failed.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="disputes"
              className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-3 pb-2 pt-1 text-xs font-medium text-muted-foreground shadow-none transition-colors data-[state=active]:border-amber-500 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:shadow-none"
            >
              Disputes
              {!loading && disputes.length > 0 && (
                <span className="ml-1.5 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  {disputes.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="failed" className="mt-0 divide-y divide-border/30">
          {loading
            ? [...Array(3)].map((_, i) => <RowSkeleton key={i} />)
            : failed.length === 0
            ? <EmptyState icon={AlertTriangle} title="No failures in last 7 days" />
            : failed.map((tx) => (
                <FailedRow
                  key={tx.uuid}
                  tx={tx}
                  onMarkReviewed={onMarkReviewed}
                  onOpenRefund={onOpenRefund}
                  lang={lang}
                />
              ))}
        </TabsContent>

        <TabsContent value="disputes" className="mt-0 divide-y divide-border/30">
          {loading
            ? [...Array(3)].map((_, i) => <RowSkeleton key={i} />)
            : disputes.length === 0
            ? <EmptyState icon={AlertTriangle} title="No open disputes" />
            : disputes.map((tx) => (
                <DisputeRow
                  key={tx.uuid}
                  tx={tx}
                  onMarkReviewed={onMarkReviewed}
                  lang={lang}
                />
              ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}