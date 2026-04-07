export const getStockStatus = (stock: number): { label: string; variant: 'default' | 'destructive' | 'ghost' | 'destructive' } => {
    if (stock <= 0) return { label: 'Out of Stock', variant: 'destructive' };
    if (stock < 10) return { label: 'Low Stock', variant: 'destructive' };
    return { label: 'In Stock', variant: 'ghost' };
};

export const getPromotionBadge = (promotion: { type: 'PERCENTAGE' | 'FIXED_AMOUNT'; discount: number }) => {
    if (promotion.type === 'PERCENTAGE') return `${promotion.discount}% OFF`;
    return `$${promotion.discount} OFF`;
};

export const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};