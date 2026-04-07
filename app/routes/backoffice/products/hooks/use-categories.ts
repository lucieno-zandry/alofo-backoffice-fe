import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '~/api/http-requests';

interface UseCategoriesReturn {
    data: Category[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export const useCategories = (): UseCategoriesReturn => {
    const [data, setData] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getCategories();
            if (response.error) throw response.error;
            setData(response.data?.categories ?? []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { data, isLoading, error, refetch: fetchCategories };
};