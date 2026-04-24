import { useState } from 'react';
import { createLandingBlock, updateLandingBlock } from '~/api/http-requests';
import { useLandingBlocksStore } from '../stores/use-landing-blocks-store';
import { useLandingBlockFormStore } from '../stores/use-landing-block-form-store';
import type { LandingBlockFormData } from '../types/landing-block-form-types';

export function useSaveLandingBlock() {
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { addBlock, updateBlock } = useLandingBlocksStore();
    const { close, mode, editingBlock } = useLandingBlockFormStore();

    const buildFormData = (formData: LandingBlockFormData): FormData => {
        const fd = new FormData();

        // Always add block_type
        fd.append('block_type', formData.block_type);

        if (formData.title) fd.append('title', formData.title);
        if (formData.subtitle) fd.append('subtitle', formData.subtitle);
        if (formData.content && Object.keys(formData.content).length) {
            fd.append('content', JSON.stringify(formData.content));
        }
        if (formData.landing_able_type && formData.landing_able_type !== '-' && formData.landing_able_id) {
            fd.append('landing_able_type', formData.landing_able_type);
            fd.append('landing_able_id', String(formData.landing_able_id));
        }
        if (formData.image) {
            fd.append('image', formData.image);
        }
        fd.append('display_order', String(formData.display_order));
        fd.append('is_active', formData.is_active ? '1' : '0');

        // For updates only
        if (mode === 'edit' && formData.remove_image) {
            fd.append('remove_image', '1');
        }

        return fd;
    };

    const save = async (formData: LandingBlockFormData) => {
        setIsSaving(true);
        setErrors({});

        try {
            if (mode === 'create') {
                const block = (await createLandingBlock(buildFormData(formData))).data!;
                addBlock(block);
            } else if (mode === 'edit' && editingBlock) {
                const block = (await updateLandingBlock(editingBlock.id, buildFormData(formData))).data!;
                updateBlock(editingBlock.id, block);
            }
            close();
        } catch (err: any) {
            // Handle Laravel-style validation errors
            if (err?.errors && typeof err.errors === 'object') {
                const fieldErrors: Record<string, string> = {};
                Object.entries(err.errors).forEach(([key, messages]) => {
                    fieldErrors[key] = Array.isArray(messages) ? messages[0] : String(messages);
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ _root: err?.message ?? 'Something went wrong' });
            }
        } finally {
            setIsSaving(false);
        }
    };

    return { save, isSaving, errors };
}