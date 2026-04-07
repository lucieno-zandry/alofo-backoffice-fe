// Append these exports to the existing http-requests.ts file

export type StoreShippingMethodData = {
    name: string;
    carrier: 'custom' | 'fedex' | 'colissimo';
    is_active?: boolean;
    calculation_type: 'flat_rate' | 'weight_based' | 'api';
    flat_rate?: number | null;
    free_shipping_threshold?: number | null;
    rate_per_kg?: number | null;
    api_config?: Record<string, any> | null;
    min_delivery_days?: number | null;
    max_delivery_days?: number | null;
    allowed_countries?: string[] | null;
};

export type UpdateShippingMethodData = Partial<StoreShippingMethodData>;

export type StoreShippingRateData = {
    country_code: string;           // ISO alpha-2 or '*'
    city_pattern?: string | null;
    min_weight_kg?: number | null;
    max_weight_kg?: number | null;
    rate: number;
    rate_per_kg?: number | null;
};

export type UpdateShippingRateData = Partial<StoreShippingRateData>;