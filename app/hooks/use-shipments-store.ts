import { create } from 'zustand';
import { fetchShipments } from '~/api/http-requests';
import type { FetchShipmentsParams, ShipmentsFilters } from '~/types/shipments';


interface ShipmentsStore {
    // Data
    shipments: Shipment[];
    pagination: {
        currentPage: number;
        perPage: number;
        total: number;
        totalPages: number;
    };
    filters: ShipmentsFilters;
    sortBy?: keyof Shipment;
    sortOrder?: 'asc' | 'desc';

    // Update
    updatingShipment: Shipment | null,
    setUpdatingShipment: (shipment: Shipment | null) => void,

    // Cancel
    cancellingShipment: Shipment | null,
    setCancellingShipment: (shipment: Shipment | null) => void,

    // UI state
    loading: boolean;
    error: string | null;

    // Actions
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setFilters: (filters: Partial<ShipmentsFilters>) => void;
    setSorting: (sortBy: keyof Shipment, sortOrder?: 'asc' | 'desc') => void;
    fetchShipments: () => Promise<void>;
}

export const useShipmentsStore = create<ShipmentsStore>((set, get) => ({
    shipments: [],
    pagination: {
        currentPage: 1,
        perPage: 10,
        total: 0,
        totalPages: 1,
    },
    filters: {
        status: 'all',
        search: '',
    },
    loading: false,
    error: null,

    setPage: (page) => {
        set((state) => ({ pagination: { ...state.pagination, currentPage: page } }));
        get().fetchShipments();
    },

    setPerPage: (perPage) => {
        set((state) => ({ pagination: { ...state.pagination, perPage, currentPage: 1 } }));
        get().fetchShipments();
    },

    setFilters: (filters) => {
        set((state) => ({
            filters: { ...state.filters, ...filters },
            pagination: { ...state.pagination, currentPage: 1 }, // reset to first page
        }));
        get().fetchShipments();
    },

    setSorting: (sortBy, sortOrder = 'asc') => {
        set({ sortBy, sortOrder, pagination: { ...get().pagination, currentPage: 1 } });
        get().fetchShipments();
    },

    fetchShipments: async () => {
        const { pagination, filters, sortBy, sortOrder } = get();
        set({ loading: true, error: null });

        try {
            const params: FetchShipmentsParams = {
                page: pagination.currentPage,
                perPage: pagination.perPage,
                filters,
                sortBy,
                sortOrder,
                with: ['order', 'order.user'], // always include these
            };

            const response = await fetchShipments(params);
            const { data, total, last_page, current_page, per_page } = response.data!;

            set({
                shipments: data,
                pagination: {
                    currentPage: current_page,
                    perPage: per_page,
                    total: total,
                    totalPages: last_page,
                },
                loading: false,
            });
        } catch (err: any) {
            set({ error: err?.message ?? 'Failed to load shipments', loading: false });
        }
    },
    updatingShipment: null,
    setUpdatingShipment: (shipment) => {
        set({ updatingShipment: shipment })
    },
    cancellingShipment: null,
    setCancellingShipment: (shipment) => {
        set({ cancellingShipment: shipment })
    }
}));