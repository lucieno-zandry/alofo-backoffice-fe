// ============================================
// HOOKS: useDeleteProduct.ts (no react-query)
// ============================================
import { useState, useCallback } from 'react';
import { deleteProducts } from '~/api/http-requests';
import { toast } from 'sonner';
import { useProducts } from './use-products';

interface UseDeleteProductReturn {
    mutate: (ids: number[]) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
    reset: () => void;
}

export const useDeleteProduct = () => {
    const { refetch } = useProducts();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = useCallback(async (ids: number[]) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await deleteProducts(ids);
            if (response.error) throw response.error;
            toast.success('Products deleted successfully');
            refetch(); // refresh the list
        } catch (err) {
            const errorObj = err instanceof Error ? err : new Error('Delete failed');
            setError(errorObj);
            toast.error(errorObj.message);
        } finally {
            setIsLoading(false);
        }
    }, [refetch]);

    return { mutate, isLoading, error };
};