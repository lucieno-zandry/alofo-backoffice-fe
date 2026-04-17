import { RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconClass?: string;
  onRefresh?: () => void;
  children?: React.ReactNode;
};

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  iconClass,
  onRefresh,
  children,
}: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", iconClass ?? "bg-muted")}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {onRefresh && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={onRefresh}
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}