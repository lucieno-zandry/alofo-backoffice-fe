// ============================================
// COMPONENT: ProductFilters.tsx (Smart + Dumb)
// ============================================
import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '~/components/ui/dialog';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useProductFilterStore } from '../../stores/use-product-filter-store';
import { useCategories } from '../../hooks/use-categories';
import getCurrency from '~/lib/get-currency';
import { symbol } from 'zod';

// Dumb Component
interface ProductFiltersViewProps {
    search: string;
    categoryId: string;
    minPrice: string;
    maxPrice: string;
    orderBy: 'created_at' | 'title';
    direction: 'ASC' | 'DESC';
    categories: Array<{ id: number; title: string }>;
    categoriesLoading: boolean;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    onOrderByChange: (value: 'created_at' | 'title') => void;
    onDirectionChange: (value: 'ASC' | 'DESC') => void;
    onReset: () => void;
}

export const ProductFiltersView = ({
    search,
    categoryId,
    minPrice,
    maxPrice,
    orderBy,
    direction,
    categories,
    categoriesLoading,
    onSearchChange,
    onCategoryChange,
    onMinPriceChange,
    onMaxPriceChange,
    onOrderByChange,
    onDirectionChange,
    onReset,
}: ProductFiltersViewProps) => {
    return (
        <div className="flex items-center gap-2 mb-6">
            {/* Main Search Bar */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 bg-background"
                />
            </div>

            {/* Advanced Filters Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 shrink-0">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Filter Products</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={categoryId} onValueChange={onCategoryChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categoriesLoading ? (
                                        <SelectItem value="loading" disabled>
                                            Loading...
                                        </SelectItem>
                                    ) : (
                                        categories.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>
                                                {cat.title}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Min Price ({getCurrency.symbol()})</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={minPrice}
                                    onChange={(e) => onMinPriceChange(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Max Price ({getCurrency.symbol()})</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={maxPrice}
                                    onChange={(e) => onMaxPriceChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Sort By</Label>
                                <Select value={orderBy} onValueChange={onOrderByChange}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="created_at">Date Added</SelectItem>
                                        <SelectItem value="title">Title</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Direction</Label>
                                <Select value={direction} onValueChange={onDirectionChange}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ASC">Ascending</SelectItem>
                                        <SelectItem value="DESC">Descending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-between flex-row items-center gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onReset}
                            className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                        </Button>
                        <DialogClose asChild>
                            <Button type="button">Apply Filters</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Smart Component
export const ProductFilters = () => {
    const { filters, setFilters, resetFilters } = useProductFilterStore();
    const { data: categories, isLoading: categoriesLoading } = useCategories();

    const [localSearch, setLocalSearch] = useState(filters.search || '');
    const [localCategoryId, setLocalCategoryId] = useState(
        filters.category_id ? String(filters.category_id) : 'all'
    );
    const [localMinPrice, setLocalMinPrice] = useState(
        filters.min_price ? String(filters.min_price) : ''
    );
    const [localMaxPrice, setLocalMaxPrice] = useState(
        filters.max_price ? String(filters.max_price) : ''
    );

    const handleSearchChange = (value: string) => {
        setLocalSearch(value);
        setFilters({ search: value || undefined });
    };

    const handleCategoryChange = (value: string) => {
        setLocalCategoryId(value);
        setFilters({ category_id: value === 'all' ? undefined : parseInt(value) });
    };

    const handleMinPriceChange = (value: string) => {
        setLocalMinPrice(value);
        setFilters({ min_price: value ? parseFloat(value) : undefined });
    };

    const handleMaxPriceChange = (value: string) => {
        setLocalMaxPrice(value);
        setFilters({ max_price: value ? parseFloat(value) : undefined });
    };

    const handleOrderByChange = (value: 'created_at' | 'title') => {
        setFilters({ order_by: value });
    };

    const handleDirectionChange = (value: 'ASC' | 'DESC') => {
        setFilters({ direction: value });
    };

    const handleReset = () => {
        resetFilters();
        setLocalSearch('');
        setLocalCategoryId('all');
        setLocalMinPrice('');
        setLocalMaxPrice('');
    };

    return (
        <ProductFiltersView
            search={localSearch}
            categoryId={localCategoryId}
            minPrice={localMinPrice}
            maxPrice={localMaxPrice}
            orderBy={filters.order_by || 'created_at'}
            direction={filters.direction || 'DESC'}
            categories={categories || []}
            categoriesLoading={categoriesLoading}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            onOrderByChange={handleOrderByChange}
            onDirectionChange={handleDirectionChange}
            onReset={handleReset}
        />
    );
};