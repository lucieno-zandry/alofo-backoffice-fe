
/**
 * Converts a ProductDraft into a FormData object matching ProductFullCreateRequest.
 *
 * Mapping:
 *  - variant_groups[i].name
 *  - variant_groups[i].options[j].value
 *  - variants[k].sku / price / special_price / stock
 *  - variants[k].option_refs[m]  →  "<groupName>:<optionValue>"  (string refs)
 *  - images[*]                   →  File blobs
 */
export function buildFullCreateFormData(draft: ProductDraft): FormData {
  const fd = new FormData();

  fd.append("title", draft.title.trim());
  fd.append("slug", draft.slug.trim());
  if (draft.description) fd.append("description", draft.description.trim());
  if (draft.category_id) fd.append("category_id", draft.category_id);

  draft.images.forEach((file) => fd.append("images[]", file));

  // Variant groups + options
  draft.variantGroups.forEach((group, gi) => {
    fd.append(`variant_groups[${gi}][name]`, group.name.trim());
    group.options.forEach((opt, oi) => {
      fd.append(`variant_groups[${gi}][options][${oi}][value]`, opt.value.trim());
    });
  });

  // Variants
  draft.variants.forEach((variant, vi) => {
    fd.append(`variants[${vi}][sku]`, variant.sku.trim());
    fd.append(`variants[${vi}][price]`, variant.price);
    if (variant.special_price)
      fd.append(`variants[${vi}][special_price]`, variant.special_price);
    fd.append(`variants[${vi}][stock]`, variant.stock);

    // option_refs: "GroupName:OptionValue" strings
    variant.optionRefs.forEach((ref, ri) => {
      const group = draft.variantGroups.find((g) => g.tempId === ref.groupTempId);
      const option = group?.options.find((o) => o.tempId === ref.optionTempId);
      if (group && option) {
        fd.append(
          `variants[${vi}][option_refs][${ri}]`,
          `${group.name.trim()}:${option.value.trim()}`
        );
      }
    });
  });

  return fd;
}