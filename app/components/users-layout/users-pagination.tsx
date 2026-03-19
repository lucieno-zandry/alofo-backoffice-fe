// routes/backoffice/users/components/UsersPaginationContainer.tsx
import { useUsersStore } from "~/hooks/use-users-store";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function UsersPagination() {
    const { meta, setPage } = useUsersStore();
    if (!meta || meta.last_page <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                Page {meta.current_page} of {meta.last_page}
            </span>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={meta.current_page <= 1}
                    onClick={() => setPage(meta.current_page - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={meta.current_page >= meta.last_page}
                    onClick={() => setPage(meta.current_page + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}