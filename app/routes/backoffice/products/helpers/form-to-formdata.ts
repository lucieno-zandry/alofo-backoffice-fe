
// ─── Create payload ───────────────────────────────────────────────────────────

import type { FormImageEntry, FormVariant, FormVariantGroup } from "../types/product-form-types";

type CreatePayload = {
    title: string;
    slug: string;
    description: string;
    category_id: string;
    images: FormImageEntry[];
    variant_groups: FormVariantGroup[];
    variants: FormVariant[];
};

export function buildCreateFormData(data: CreatePayload): FormData {
    const fd = new FormData();

    fd.append("title", data.title);
    fd.append("slug", data.slug);
    if (data.description) fd.append("description", data.description);
    if (data.category_id) fd.append("category_id", data.category_id);

    // images
    data.images.forEach((img) => {
        if (img.file) fd.append("images[]", img.file);
    });

    // variant groups + options
    data.variant_groups.forEach((g, gi) => {
        fd.append(`variant_groups[${gi}][name]`, g.name);
        g.options.forEach((o, oi) => {
            fd.append(`variant_groups[${gi}][options][${oi}][value]`, o.value);
        });
    });

    // build option _key → "gi.oi" string so variants can reference
    const keyToRef: Record<string, string> = {};
    data.variant_groups.forEach((g, gi) => {
        g.options.forEach((o, oi) => {
            keyToRef[o._key] = `${gi}.${oi}`;
        });
    });

    // variants
    data.variants.forEach((v, vi) => {
        fd.append(`variants[${vi}][sku]`, v.sku);
        fd.append(`variants[${vi}][price]`, v.price);
        fd.append(`variants[${vi}][stock]`, v.stock);
        if (v.image) fd.append(`variants[${vi}][image]`, v.image);
        if (v.weight_kg) fd.append(`variants[${vi}][weight_kg]`, v.weight_kg);
        if (v.length_cm) fd.append(`variants[${vi}][length_cm]`, v.length_cm);
        if (v.width_cm) fd.append(`variants[${vi}][width_cm]`, v.width_cm);
        if (v.height_cm) fd.append(`variants[${vi}][height_cm]`, v.height_cm);
        v.option_refs.forEach((optKey, ri) => {
            fd.append(`variants[${vi}][option_refs][${ri}]`, keyToRef[optKey] ?? optKey);
        });
    });

    return fd;
}

// ─── Update payload ───────────────────────────────────────────────────────────

type UpdatePayload = CreatePayload & {
    existingImageIds: number[];  // IDs to keep
};

export function buildUpdateFormData(data: UpdatePayload): FormData {
    const fd = buildCreateFormData(data);

    // tell the server which existing images to keep
    data.existingImageIds.forEach((id, i) => {
        fd.append(`existing_image_ids[${i}]`, String(id));
    });

    // include existing variant group ids
    data.variant_groups.forEach((g, gi) => {
        if (g.id) fd.append(`variant_groups[${gi}][id]`, String(g.id));
        g.options.forEach((o, oi) => {
            if (o.id) fd.append(`variant_groups[${gi}][options][${oi}][id]`, String(o.id));
        });
    });

    // include existing variant ids
    data.variants.forEach((v, vi) => {
        if (v.id) fd.append(`variants[${vi}][id]`, String(v.id));
        // empty string signals image removal
        if (v.image === null && !v.existing_image_url) {
            fd.append(`variants[${vi}][image]`, "");
        }
    });

    return fd;
}