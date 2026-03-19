// routes/backoffice/users/components/UsersFiltersContainer.tsx
import { useState, useEffect } from "react";
import { useUsersStore } from "~/hooks/use-users-store";
import useDebounce from "~/hooks/use-debounce";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { SlidersHorizontal, Search, ArrowDownAZ, ArrowUpZA } from "lucide-react";

interface UsersFiltersViewProps {
    searchTerm: string;
    roleFilter: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
    onSearchChange: (term: string) => void;
    onRoleChange: (role: string) => void;
    onSortChange: (field: string, order: "asc" | "desc") => void;
}

export function UsersFiltersView({
    searchTerm,
    roleFilter,
    sortBy,
    sortOrder,
    onSearchChange,
    onRoleChange,
    onSortChange,
}: UsersFiltersViewProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-3 pb-4">
            {/* Standard Search Input */}
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 bg-background"
                />
            </div>

            {/* Filters Popover */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72" align="end">
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm leading-none">Filters & Sorting</h4>
                        <Separator />

                        {/* Role filter */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Role</Label>
                            <Select value={roleFilter} onValueChange={onRoleChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All roles</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="client">Client</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sort by */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Sort Field</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={sortBy}
                                    onValueChange={(val) => onSortChange(val, sortOrder)}
                                >
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Name</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="created_at">Created Date</SelectItem>
                                        <SelectItem value="updated_at">Updated Date</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Sort Order Toggle */}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onSortChange(sortBy, sortOrder === "asc" ? "desc" : "asc")}
                                    title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
                                >
                                    {sortOrder === "asc" ? (
                                        <ArrowUpZA className="h-4 w-4" />
                                    ) : (
                                        <ArrowDownAZ className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export function UsersFilters() {
    const { filters, setFilters } = useUsersStore();
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const debouncedSearch = useDebounce(searchTerm, 300);

    // Update store search filter when debounced search changes
    // This removes the need for duplicate API calls for suggestions
    useEffect(() => {
        setFilters({ search: debouncedSearch || undefined });
    }, [debouncedSearch, setFilters]);

    return (
        <UsersFiltersView
            searchTerm={searchTerm}
            roleFilter={filters.role || "all"}
            sortBy={filters.sort_by || "created_at"}
            sortOrder={filters.sort_order || "desc"}
            onSearchChange={setSearchTerm}
            onRoleChange={(role) => setFilters({ role: role as any })}
            onSortChange={(field, order) => setFilters({ sort_by: field, sort_order: order })}
        />
    );
}