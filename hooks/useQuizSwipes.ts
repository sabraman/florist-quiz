"use client";

import { useState, useCallback, useEffect } from "react";
import { flowers } from "@/data/flowers";
import type { Flower } from "@/types/flower";
import { useQuizStore } from "@/store/useQuizStore";
import type { SwipeState } from "@/types/quiz";

export function useQuizSwipes(
    correctFlower: Flower | null,
    hasChecked: boolean,
    onCorrect: () => void
): SwipeState {
    const { addAnswer, addXp, loseHeart } = useQuizStore();
    const [swipeLabel, setSwipeLabel] = useState<string>("");
    const [isMatch, setIsMatch] = useState<boolean>(false);

    const generate = useCallback(() => {
        if (!correctFlower) return;
        const match = Math.random() > 0.5;
        setIsMatch(match);
        if (match) {
            setSwipeLabel(correctFlower.name);
        } else {
            const shuffled = [...flowers].sort(() => 0.5 - Math.random());
            const wrongName = shuffled.find(f => f.id !== correctFlower.id)?.name || "Цветок";
            setSwipeLabel(wrongName);
        }
    }, [correctFlower]);

    useEffect(() => {
        generate();
    }, [generate]);

    const handleSwipe = (direction: "right" | "left") => {
        if (hasChecked || !correctFlower) return;

        const swipedRight = direction === "right";
        const correct = swipedRight === isMatch;

        if (correct) {
            addAnswer(correctFlower.id, true);
            addXp(12);
            onCorrect();
        } else {
            loseHeart();
            addAnswer(correctFlower.id, false);
            onCorrect(); // Move to next anyway in swipes mode
        }
    };

    return {
        swipeLabel,
        handleSwipe,
    };
}
