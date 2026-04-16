export type VariantQueryParams = {
    page?: number;
    per_page?: number;
    sort_by?: 'id' | 'sku' | 'price' | 'stock' | 'created_at' | 'updated_at';
    sort_order?: 'asc' | 'desc';
    // Filters
    product_id?: number;
    sku?: string;                // partial match
    min_price?: number;
    max_price?: number;
    min_stock?: number;
    max_stock?: number;
    low_stock?: boolean;         // e.g., stock < 5
    with?: string[];             // relations: 'product', 'image', 'variant_options', 'promotions'
    search?: string;             // search in SKU or product title
};