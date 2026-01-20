"use client";

import { useState, useCallback, useEffect } from "react";
import { flowers } from "@/data/flowers";
import type { Flower } from "@/types/flower";
import { type QuizMode, useQuizStore } from "@/store/useQuizStore";
import type { MultipleChoiceState } from "@/types/quiz";

export function useQuizMultipleChoice(
    correctFlower: Flower | null,
    hasChecked: boolean,
    onCorrect: () => void,
    mode: QuizMode | null
): MultipleChoiceState {
    const { loseHeart, addAnswer, addXp } = useQuizStore();
    const [options, setOptions] = useState<Flower[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [wrongIds, setWrongIds] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const generate = useCallback(() => {
        if (!correctFlower) return;

        let choices: Flower[] = [];

        if (mode === "prices") {
            // Price Mode: Ensure all options have unique prices
            const uniquePriceDistractors: Flower[] = [];
            const seenPrices = new Set<number>([correctFlower.price]);

            // Shuffle all flowers except the correct one
            const shuffled = [...flowers]
                .filter(f => f.id !== correctFlower.id)
                .sort(() => 0.5 - Math.random());

            for (const flower of shuffled) {
                if (!seenPrices.has(flower.price)) {
                    uniquePriceDistractors.push(flower);
                    seenPrices.add(flower.price);
                }
                if (uniquePriceDistractors.length === 3) break;
            }

            choices = [correctFlower, ...uniquePriceDistractors].sort(() => 0.5 - Math.random());
        } else {
            // Standard Mode: Just ensure different IDs
            const shuffled = [...flowers]
                .filter(f => f.id !== correctFlower.id)
                .sort(() => 0.5 - Math.random());
            choices = [correctFlower, ...shuffled.slice(0, 3)].sort(() => 0.5 - Math.random());
        }

        setOptions(choices);
        setSelectedId(null);
        setWrongIds([]);
        setIsCorrect(null);
    }, [correctFlower, mode]);

    useEffect(() => {
        generate();
    }, [generate]);

    const handleSelect = (id: string) => {
        if (hasChecked || wrongIds.includes(id)) return;
        setSelectedId(id);

        const correct = id === correctFlower?.id;
        setIsCorrect(correct);

        if (correct) {
            addAnswer(correctFlower!.id, true);
            addXp(10);
            onCorrect();
        } else {
            setWrongIds((prev) => [...prev, id]);
            loseHeart();
        }
    };

    return {
        options,
        selectedId,
        wrongIds,
        isCorrect,
        handleSelect,
    };
}
