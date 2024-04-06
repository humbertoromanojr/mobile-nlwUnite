import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const useBadgeStore = create(
  persist<BadgeStateProps>(
    (set) => ({
      data: null,

      save: (data: BadgeStore) => set(() => ({ data })),
    }),
    {
      name: "nlw-unite:badge",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
