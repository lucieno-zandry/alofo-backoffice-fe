import { RefreshCw, LayoutDashboard } from "lucide-react";
import { Button } from "~/components/ui/button";

type Props = {
  onRefreshAll: () => void;
  isRefreshing: boolean;
  lastUpdated: Date | null;
};

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export function DashboardHeaderView({ onRefreshAll, isRefreshing, lastUpdated }: Props) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm">
          <LayoutDashboard className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Updated {timeAgo(lastUpdated)}
            </p>
          )}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 self-start sm:self-auto"
        onClick={onRefreshAll}
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
        Refresh all
      </Button>
    </div>
  );
}