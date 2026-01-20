import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Flower } from "@/types/flower";

export type QuizMode = "name-to-images" | "image-to-names" | "spelling" | "matcher" | "prices" | "catalog" | "swipes" | "select-pair";

interface QuizHistoryEntry {
    flowerId: string;
    correct: boolean;
}

interface QuizState {
    mode: QuizMode | null;
    score: number;
    hearts: number;
    maxHearts: number;
    streak: number;
    lastPlayedDate: string | null;
    level: number;
    xp: number;
    history: QuizHistoryEntry[];

    setMode: (mode: QuizMode | null) => void;
    addAnswer: (flowerId: string, correct: boolean) => void;
    resetScore: () => void;
    loseHeart: () => void;
    restoreHearts: () => void;
    checkStreak: () => void;
    addXp: (amount: number) => void;
    finishLevel: () => void;
}

export const useQuizStore = create<QuizState>()(
    persist(
        (set, get) => ({
            mode: null,
            score: 0,
            hearts: 5,
            maxHearts: 5,
            streak: 0,
            lastPlayedDate: null,
            level: 1,
            xp: 0,
            history: [],

            setMode: (mode) => set({ mode }),
            addAnswer: (flowerId, correct) =>
                set((state) => ({
                    score: correct ? state.score + 1 : state.score,
                    history: [...state.history, { flowerId, correct }],
                })),
            resetScore: () => set({ score: 0, history: [] }),
            loseHeart: () => set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),
            restoreHearts: () => set((state) => ({ hearts: state.maxHearts })),
            checkStreak: () =>
                set((state) => {
                    const today = new Date().toISOString().split("T")[0];
                    if (state.lastPlayedDate === today) return {};

                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split("T")[0];

                    if (state.lastPlayedDate === yesterdayStr) {
                        return { streak: state.streak + 1, lastPlayedDate: today };
                    }
                    return { streak: 1, lastPlayedDate: today };
                }),
            addXp: (amount) => set((state) => {
                const newXp = state.xp + amount;
                const newLevel = Math.floor(newXp / 100) + 1;
                return { xp: newXp, level: newLevel };
            }),
            finishLevel: () => set((state) => ({ level: state.level + 1 })),
        }),
        {
            name: "florist-quiz-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1, // Added for future migration support
        }
    )
);
