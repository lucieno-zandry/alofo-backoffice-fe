import { create } from "zustand"
import type { PaginatedResponse } from "~/api/app-fetch"

export type ProductStore = {
    data?: PaginatedResponse<Product>,
    setData: (data: ProductStore['data']) => void,
}

export default create<ProductStore>(set => ({
    setData: (data) => set({ data }),
}))