import { useEffect } from 'react';
import { getLandingBlocks } from '~/api/http-requests';
import { useLandingBlocksStore } from '../stores/use-landing-blocks-store';

export function useLandingBlocks() {
    const { blocks, isLoading, error, setBlocks, setLoading, setError } = useLandingBlocksStore();

    const fetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getLandingBlocks();
            setBlocks(data.data!);
        } catch (err: any) {
            setError(err?.message ?? 'Failed to load landing blocks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return { blocks, isLoading, error, refetch: fetch };
}