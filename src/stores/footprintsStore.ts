import { create } from 'zustand';

interface FootprintsStore {
  activeCity: string | null;
  selectedPhoto: number | null;
  setActiveCity: (cityId: string | null) => void;
  setSelectedPhoto: (index: number | null) => void;
  closeAll: () => void;
}

export const useFootprintsStore = create<FootprintsStore>((set) => ({
  activeCity: null,
  selectedPhoto: null,
  setActiveCity: (cityId) => set({ activeCity: cityId, selectedPhoto: null }),
  setSelectedPhoto: (index) => set({ selectedPhoto: index }),
  closeAll: () => set({ activeCity: null, selectedPhoto: null }),
}));
