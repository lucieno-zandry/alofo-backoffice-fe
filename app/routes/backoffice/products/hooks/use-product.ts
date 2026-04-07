import { useState, useEffect, useCallback } from 'react';
import { getProduct } from '~/api/http-requests';

interface UseProductReturn {
    data: Product | undefined;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export const useProduct = (slug: string): UseProductReturn => {
    const [data, setData] = useState<Product | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchProduct = useCallback(async () => {
        if (!slug) {
            setData(undefined);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await getProduct(slug);
            if (response.error) throw response.error;
            setData(response.data?.product);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch product'));
        } finally {
            setIsLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return { data, isLoading, error, refetch: fetchProduct };
};