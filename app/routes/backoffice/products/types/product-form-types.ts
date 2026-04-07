// ─── Local form-state types (not the API models) ─────────────────────────────

export type FormVariantOption = {
  /** undefined = new (not yet saved) */
  id?: number;
  value: string;
  /** stable client-side key for React lists */
  _key: string;
};

export type FormVariantGroup = {
  /** undefined = new */
  id?: number;
  name: string;
  options: FormVariantOption[];
  /** stable client-side key */
  _key: string;
};

export type FormVariant = {
  /** undefined = new */
  id?: number;
  sku: string;
  price: string;   // string to keep input controlled
  stock: string;
  /** client-side ref keys that link to FormVariantOption._key */
  option_refs: string[];
  /** new image file selected by user */
  image?: File | null;
  /** URL of the currently persisted image (update mode) */
  existing_image_url?: string | null;
  /** stable client-side key */
  _key: string;

  // physical dimensions / shipping metadata
  weight_kg?: string;
  length_cm?: string;
  width_cm?: string;
  height_cm?: string;
};

export type FormImageEntry = {
  /** set when image already exists in DB */
  id?: number;
  /** preview src – either a blob URL or the API URL */
  previewUrl: string;
  /** set when the user uploads a new file */
  file?: File;
  _key: string;
};

export type ProductFormStep = 1 | 2 | 3;

export type FieldErrors = Record<string, string[]>;