import { ShieldAlert, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { SectionHeader } from "../section-header";
import { StatusBadge } from "../status-badge";
import { EmptyState } from "../empty-state";
import { formatDate } from "../../helpers/dashboard-helpers";
import type { UserIssue } from "../../types/dashboard-types";

type Props = {
  users: UserIssue[];
  loading: boolean;
  onRefresh: () => void;
  lang: string;
};

export function UserIssuesView({ users, loading, onRefresh, lang }: Props) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-sm">
      <div className="border-b border-border/50 p-5">
        <SectionHeader
          title="User Issues"
          subtitle="Recently blocked or suspended accounts"
          icon={ShieldAlert}
          iconClass="bg-rose-500/10 text-rose-600 dark:text-rose-400"
          onRefresh={onRefresh}
        />
      </div>

      <div className="divide-y divide-border/30">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            ))
          : users.length === 0
          ? <EmptyState icon={ShieldAlert} title="No issues found" description="All users are in good standing" />
          : users.map((user) => (
              <div
                key={user.id}
                className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/30"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    {user.status && (
                      <StatusBadge
                        label={user.status.status}
                        variant={user.status.status === "blocked" ? "danger" : "warning"}
                      />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  {user.status?.reason && (
                    <p className="mt-1 text-xs text-muted-foreground/70 line-clamp-1">
                      Reason: {user.status.reason}
                    </p>
                  )}
                  {user.status?.expires_at && (
                    <p className="text-xs text-amber-500 dark:text-amber-400">
                      Expires: {formatDate(user.status.expires_at)}
                    </p>
                  )}
                </div>

                {/* Link */}
                <Link
                  to={`/${lang}/users/${user.id}`}
                  className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}