export const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        created_at: "2024-01-10T08:00:00Z",
        updated_at: "2024-03-15T12:00:00Z",
        slug: "classic-leather-sneaker",
        title: "Classic Leather Sneaker",
        description:
            "A timeless leather sneaker handcrafted from full-grain cowhide. Features a cushioned insole and durable rubber outsole for all-day comfort.",
        category_id: 1,
        category: { id: 1, created_at: "", updated_at: "", title: "Footwear", parent_id: null },
        images: [
            { id: 1, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", width: 800, height: 600 },
            { id: 2, url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800", width: 800, height: 600 },
        ],
        variant_groups: [
            {
                id: 1, created_at: "", updated_at: "", product_id: 1, name: "Size",
                variant_options: [
                    { id: 1, created_at: "", updated_at: "", value: "40", variant_group_id: 1 },
                    { id: 2, created_at: "", updated_at: "", value: "41", variant_group_id: 1 },
                    { id: 3, created_at: "", updated_at: "", value: "42", variant_group_id: 1 },
                    { id: 4, created_at: "", updated_at: "", value: "43", variant_group_id: 1 },
                ],
            },
            {
                id: 2, created_at: "", updated_at: "", product_id: 1, name: "Color",
                variant_options: [
                    { id: 5, created_at: "", updated_at: "", value: "White", variant_group_id: 2 },
                    { id: 6, created_at: "", updated_at: "", value: "Black", variant_group_id: 2 },
                    { id: 7, created_at: "", updated_at: "", value: "Tan", variant_group_id: 2 },
                ],
            },
        ],
        variants: [
            { id: 1, created_at: "", updated_at: "", product_id: 1, sku: "CLS-40-W", price: 12900, special_price: 9900, stock: 5, image_id: null, variant_options: [{ id: 1, created_at: "", updated_at: "", value: "40", variant_group_id: 1 }, { id: 5, created_at: "", updated_at: "", value: "White", variant_group_id: 2 }] },
            { id: 2, created_at: "", updated_at: "", product_id: 1, sku: "CLS-41-W", price: 12900, special_price: null, stock: 12, image_id: null, variant_options: [{ id: 2, created_at: "", updated_at: "", value: "41", variant_group_id: 1 }, { id: 5, created_at: "", updated_at: "", value: "White", variant_group_id: 2 }] },
            { id: 3, created_at: "", updated_at: "", product_id: 1, sku: "CLS-42-B", price: 12900, special_price: null, stock: 0, image_id: null, variant_options: [{ id: 3, created_at: "", updated_at: "", value: "42", variant_group_id: 1 }, { id: 6, created_at: "", updated_at: "", value: "Black", variant_group_id: 2 }] },
            { id: 4, created_at: "", updated_at: "", product_id: 1, sku: "CLS-43-T", price: 12900, special_price: null, stock: 3, image_id: null, variant_options: [{ id: 4, created_at: "", updated_at: "", value: "43", variant_group_id: 1 }, { id: 7, created_at: "", updated_at: "", value: "Tan", variant_group_id: 2 }] },
        ],
    },
    {
        id: 2,
        created_at: "2024-02-01T08:00:00Z",
        updated_at: "2024-03-10T08:00:00Z",
        slug: "merino-wool-sweater",
        title: "Merino Wool Sweater",
        description:
            "Ultra-soft 100% Merino wool sweater with a relaxed fit. Temperature-regulating and naturally odor-resistant, perfect for layering.",
        category_id: 2,
        category: { id: 2, created_at: "", updated_at: "", title: "Tops", parent_id: null },
        images: [
            { id: 3, url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800", width: 800, height: 600 },
        ],
        variant_groups: [
            {
                id: 3, created_at: "", updated_at: "", product_id: 2, name: "Size",
                variant_options: [
                    { id: 8, created_at: "", updated_at: "", value: "XS", variant_group_id: 3 },
                    { id: 9, created_at: "", updated_at: "", value: "S", variant_group_id: 3 },
                    { id: 10, created_at: "", updated_at: "", value: "M", variant_group_id: 3 },
                    { id: 11, created_at: "", updated_at: "", value: "L", variant_group_id: 3 },
                    { id: 12, created_at: "", updated_at: "", value: "XL", variant_group_id: 3 },
                ],
            },
        ],
        variants: [
            { id: 5, created_at: "", updated_at: "", product_id: 2, sku: "MWS-XS", price: 8900, special_price: null, stock: 7, image_id: null },
            { id: 6, created_at: "", updated_at: "", product_id: 2, sku: "MWS-S", price: 8900, special_price: null, stock: 14, image_id: null },
            { id: 7, created_at: "", updated_at: "", product_id: 2, sku: "MWS-M", price: 8900, special_price: null, stock: 20, image_id: null },
            { id: 8, created_at: "", updated_at: "", product_id: 2, sku: "MWS-L", price: 8900, special_price: 7500, stock: 2, image_id: null },
            { id: 9, created_at: "", updated_at: "", product_id: 2, sku: "MWS-XL", price: 8900, special_price: null, stock: 0, image_id: null },
        ],
    },
    {
        id: 3,
        created_at: "2024-01-20T08:00:00Z",
        updated_at: "2024-03-20T08:00:00Z",
        slug: "canvas-tote-bag",
        title: "Canvas Tote Bag",
        description:
            "Heavy-duty waxed canvas tote with leather handles and brass hardware. Fits a 15\" laptop and has an interior zip pocket.",
        category_id: 3,
        category: { id: 3, created_at: "", updated_at: "", title: "Accessories", parent_id: null },
        images: [
            { id: 4, url: "https://images.unsplash.com/photo-1614179818511-84a91c61e98b?w=800", width: 800, height: 600 },
        ],
        variant_groups: [
            {
                id: 4, created_at: "", updated_at: "", product_id: 3, name: "Color",
                variant_options: [
                    { id: 13, created_at: "", updated_at: "", value: "Natural", variant_group_id: 4 },
                    { id: 14, created_at: "", updated_at: "", value: "Olive", variant_group_id: 4 },
                    { id: 15, created_at: "", updated_at: "", value: "Navy", variant_group_id: 4 },
                ],
            },
        ],
        variants: [
            { id: 10, created_at: "", updated_at: "", product_id: 3, sku: "CTB-NAT", price: 6500, special_price: null, stock: 30, image_id: null },
            { id: 11, created_at: "", updated_at: "", product_id: 3, sku: "CTB-OLV", price: 6500, special_price: null, stock: 18, image_id: null },
            { id: 12, created_at: "", updated_at: "", product_id: 3, sku: "CTB-NVY", price: 6500, special_price: null, stock: 0, image_id: null },
        ],
    },
    {
        id: 4,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-22T08:00:00Z",
        slug: "slim-chino-pants",
        title: "Slim Chino Pants",
        description:
            "Tapered slim-fit chinos in a stretch cotton-blend fabric. Clean lines and a versatile neutral palette make these an everyday essential.",
        category_id: 4,
        category: { id: 4, created_at: "", updated_at: "", title: "Bottoms", parent_id: null },
        images: [],
        variant_groups: [
            {
                id: 5, created_at: "", updated_at: "", product_id: 4, name: "Waist",
                variant_options: [
                    { id: 16, created_at: "", updated_at: "", value: "30", variant_group_id: 5 },
                    { id: 17, created_at: "", updated_at: "", value: "32", variant_group_id: 5 },
                    { id: 18, created_at: "", updated_at: "", value: "34", variant_group_id: 5 },
                ],
            },
            {
                id: 6, created_at: "", updated_at: "", product_id: 4, name: "Length",
                variant_options: [
                    { id: 19, created_at: "", updated_at: "", value: "30", variant_group_id: 6 },
                    { id: 20, created_at: "", updated_at: "", value: "32", variant_group_id: 6 },
                ],
            },
        ],
        variants: [
            { id: 13, created_at: "", updated_at: "", product_id: 4, sku: "SCP-30-30", price: 7900, special_price: null, stock: 8, image_id: null },
            { id: 14, created_at: "", updated_at: "", product_id: 4, sku: "SCP-32-32", price: 7900, special_price: null, stock: 15, image_id: null },
            { id: 15, created_at: "", updated_at: "", product_id: 4, sku: "SCP-34-32", price: 7900, special_price: null, stock: 4, image_id: null },
        ],
    },
    {
        id: 5,
        created_at: "2024-02-15T08:00:00Z",
        updated_at: "2024-03-18T08:00:00Z",
        slug: "ceramic-pour-over-set",
        title: "Ceramic Pour-Over Set",
        description:
            "Hand-thrown stoneware pour-over dripper with a matching carafe. Each piece is unique due to the artisan glazing process. No variants — one size fits all.",
        category_id: 5,
        category: { id: 5, created_at: "", updated_at: "", title: "Homeware", parent_id: null },
        images: [
            { id: 5, url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800", width: 800, height: 600 },
        ],
        variant_groups: [],
        variants: [
            { id: 16, created_at: "", updated_at: "", product_id: 5, sku: "CPO-SET", price: 15000, special_price: null, stock: 9, image_id: null },
        ],
    },
];