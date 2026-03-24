// ~/components/promotions/promotion-validity-timeline.tsx
import { Calendar } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  format,
  parseISO,
  isAfter,
  isBefore,
  differenceInDays,
} from "date-fns";

export type PromotionValidityTimelineProps = {
  start_date: string;
  end_date: string;
};

export function PromotionValidityTimeline({
  start_date,
  end_date,
}: PromotionValidityTimelineProps) {
  const now = new Date();
  const start = parseISO(start_date);
  const end = parseISO(end_date);

  const total = end.getTime() - start.getTime();
  const elapsed = Math.max(
    0,
    Math.min(now.getTime() - start.getTime(), total)
  );
  const percent = total > 0 ? (elapsed / total) * 100 : 0;

  const isExpired = isAfter(now, end);
  const isNotStarted = isBefore(now, start);
  const daysLeft = differenceInDays(end, now);
  const daysUntilStart = differenceInDays(start, now);

  const barColor = isExpired
    ? "bg-red-500"
    : isNotStarted
    ? "bg-muted-foreground/40"
    : percent > 80
    ? "bg-amber-500"
    : "bg-emerald-500";

  const statusText = isExpired
    ? "Expired"
    : isNotStarted
    ? `Starts in ${daysUntilStart} day${daysUntilStart !== 1 ? "s" : ""}`
    : daysLeft === 0
    ? "Expires today"
    : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining`;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {format(start, "MMM d, yyyy")}
        </span>
        <span className="flex items-center gap-1">
          {format(end, "MMM d, yyyy")}
          <Calendar className="h-3 w-3" />
        </span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            barColor
          )}
          style={{ width: `${Math.max(percent, isNotStarted ? 0 : 2)}%` }}
        />
      </div>

      <p
        className={cn(
          "text-xs text-center font-medium",
          isExpired
            ? "text-red-500"
            : isNotStarted
            ? "text-muted-foreground"
            : percent > 80
            ? "text-amber-600"
            : "text-emerald-600"
        )}
      >
        {statusText}
      </p>
    </div>
  );
}