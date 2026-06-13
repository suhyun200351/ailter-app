"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AgeGroup = "under13" | "14-16" | "17-19" | "adult" | null;

type AilterState = {
  isOnboarded: boolean;
  age: AgeGroup;
  aiActive: boolean;
  notificationsOn: boolean;
  showBadge: boolean;
  guideCompleted: string[];

  setOnboarded: (v: boolean) => void;
  setAge: (age: AgeGroup) => void;
  toggleAI: () => void;
  toggleNotifications: () => void;
  toggleBadge: () => void;
  completeGuide: (id: string) => void;
};

export const useStore = create<AilterState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      age: null,
      aiActive: true,
      notificationsOn: true,
      showBadge: true,
      guideCompleted: [],

      setOnboarded: (v) => set({ isOnboarded: v }),
      setAge: (age) => set({ age }),
      toggleAI: () => set((s) => ({ aiActive: !s.aiActive })),
      toggleNotifications: () => set((s) => ({ notificationsOn: !s.notificationsOn })),
      toggleBadge: () => set((s) => ({ showBadge: !s.showBadge })),
      completeGuide: (id) =>
        set((s) => ({
          guideCompleted: [...new Set([...s.guideCompleted, id])],
        })),
    }),
    { name: "ailter-store" }
  )
);
