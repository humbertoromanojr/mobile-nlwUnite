import { create } from "zustand";

export type BadgeStore = {
  id: string;
  name: string;
  email: string;
  eventTitle: string;
  checkInUrl: string;
  image?: string;
};

type BadgeStateProps = {
  data: BadgeStore | null;
  save: (badge: BadgeStore) => void;
};

export const useBadgeStore = create((set) => ({
  data: null,

  save: (data: BadgeStore) => set(() => ({ data })),
}));
