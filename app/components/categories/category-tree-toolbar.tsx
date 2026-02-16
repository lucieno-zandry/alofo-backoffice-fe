// ~/routes/backoffice/categories/components/category-tree-toolbar.tsx
import { Search, SortAsc, SortDesc, X, Filter } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";

export type SortField = "title" | "created_at" | "updated_at";
export type SortDirection = "asc" | "desc";
export type FilterType = "all" | "root" | "children";

export interface TreeToolbarState {
    search: string;
    sortField: SortField;
    sortDirection: SortDirection;
    filterType: FilterType;
}

interface CategoryTreeToolbarProps {
    state: TreeToolbarState;
    onChange: (patch: Partial<TreeToolbarState>) => void;
    totalCount: number;
    visibleCount: number;
}

export function CategoryTreeToolbar({
    state,
    onChange,
    totalCount,
    visibleCount,
}: CategoryTreeToolbarProps) {
    const hasActiveFilters =
        state.search !== "" ||
        state.filterType !== "all" ||
        state.sortField !== "title" ||
        state.sortDirection !== "asc";

    const resetAll = () =>
        onChange({ search: "", filterType: "all", sortField: "title", sortDirection: "asc" });

    const sortLabel: Record<SortField, string> = {
        title: "Name",
        created_at: "Created",
        updated_at: "Updated",
    };

    return (
        <div className="flex flex-col gap-3 mb-6">
            {/* Search + controls row */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        value={state.search}
                        onChange={(e) => onChange({ search: e.target.value })}
                        placeholder="Search categories…"
                        className="pl-9 pr-9 h-9 bg-background/60 border-border/60 focus:border-primary/50 focus:bg-background transition-colors rounded-xl"
                    />
                    {state.search && (
                        <button
                            onClick={() => onChange({ search: "" })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {/* Filter dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className={`h-9 gap-1.5 rounded-xl border-border/60 px-3 ${state.filterType !== "all"
                                    ? "border-primary/50 bg-primary/5 text-primary"
                                    : "bg-background/60"
                                }`}
                        >
                            <Filter className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">
                                {state.filterType === "all"
                                    ? "All"
                                    : state.filterType === "root"
                                        ? "Root only"
                                        : "Sub only"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel className="text-xs">Show</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={state.filterType}
                            onValueChange={(v) => onChange({ filterType: v as FilterType })}
                        >
                            <DropdownMenuRadioItem value="all">All categories</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="root">Root only</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="children">Sub-categories only</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className={`h-9 gap-1.5 rounded-xl border-border/60 px-3 ${state.sortField !== "title" || state.sortDirection !== "asc"
                                    ? "border-primary/50 bg-primary/5 text-primary"
                                    : "bg-background/60"
                                }`}
                        >
                            {state.sortDirection === "asc" ? (
                                <SortAsc className="h-3.5 w-3.5" />
                            ) : (
                                <SortDesc className="h-3.5 w-3.5" />
                            )}
                            <span className="text-xs font-medium">{sortLabel[state.sortField]}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel className="text-xs">Sort by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={state.sortField}
                            onValueChange={(v) => onChange({ sortField: v as SortField })}
                        >
                            <DropdownMenuRadioItem value="title">Name</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="created_at">Created date</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="updated_at">Updated date</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs">Direction</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                            checked={state.sortDirection === "asc"}
                            onCheckedChange={() => onChange({ sortDirection: "asc" })}
                        >
                            Ascending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={state.sortDirection === "desc"}
                            onCheckedChange={() => onChange({ sortDirection: "desc" })}
                        >
                            Descending
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Reset */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetAll}
                        className="h-9 px-2.5 rounded-xl text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-3.5 w-3.5" />
                    </Button>
                )}
            </div>

            {/* Results count */}
            {(state.search || state.filterType !== "all") && (
                <p className="text-xs text-muted-foreground pl-1">
                    Showing{" "}
                    <span className="font-semibold text-foreground">{visibleCount}</span> of{" "}
                    <span className="font-semibold text-foreground">{totalCount}</span> categories
                </p>
            )}
        </div>
    );
}