import { create } from 'zustand';

type LandingBlockDeleteDialogState = {
  isOpen: boolean;
  blockId: number | null;
  blockType: string | null;
  open: (blockId: number, blockType: string) => void;
  close: () => void;
};

export const useLandingBlockDeleteDialogStore = create<LandingBlockDeleteDialogState>((set) => ({
  isOpen: false,
  blockId: null,
  blockType: null,

  open: (blockId, blockType) => set({ isOpen: true, blockId, blockType }),
  close: () => set({ isOpen: false, blockId: null, blockType: null }),
}));