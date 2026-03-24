import { cn } from "~/lib/utils";

export type StatCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub: string;
    accent: "default" | "amber" | "red";
};

export function StatCard({ icon, label, value, sub, accent }: StatCardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border p-3.5 space-y-2",
                accent === "amber" && "border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800",
                accent === "red" && "border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-800",
                accent === "default" && "bg-muted/30"
            )}
        >
            <div
                className={cn(
                    "h-7 w-7 rounded-lg flex items-center justify-center",
                    accent === "amber" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40" :
                        accent === "red" ? "bg-red-100 text-red-600 dark:bg-red-900/40" :
                            "bg-background border"
                )}
            >
                {icon}
            </div>
            <div>
                <p className="text-lg font-bold leading-none">{value}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
                <p className="text-[10px] text-muted-foreground/70">{sub}</p>
            </div>
        </div>
    );
}
