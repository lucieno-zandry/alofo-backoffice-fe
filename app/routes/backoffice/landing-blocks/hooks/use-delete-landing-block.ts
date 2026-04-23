import { useState } from 'react';
import { deleteLandingBlock } from '~/api/http-requests';
import { useLandingBlocksStore } from '../stores/use-landing-blocks-store';
import { useLandingBlockDeleteDialogStore } from '../stores/use-landing-block-delete-dialog-store';

export function useDeleteLandingBlock() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { removeBlock } = useLandingBlocksStore();
    const { close } = useLandingBlockDeleteDialogStore();

    const deleteBlock = async (id: number) => {
        setIsDeleting(true);
        setError(null);
        try {
            await deleteLandingBlock(id);
            removeBlock(id);
            close();
        } catch (err: any) {
            setError(err?.message ?? 'Failed to delete block');
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteBlock, isDeleting, error };
}