"use client";

import { useState, useCallback, useEffect } from "react";
import type { Flower } from "@/types/flower";
import { useQuizStore } from "@/store/useQuizStore";
import type { SpellingState } from "@/types/quiz";

export function useQuizSpelling(
    correctFlower: Flower | null,
    hasChecked: boolean,
    onCorrect: () => void
): SpellingState {
    const { loseHeart, addAnswer, addXp } = useQuizStore();
    const [letters, setLetters] = useState<string[]>([]);
    const [input, setInput] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);
    const [isError, setIsError] = useState(false);

    const generate = useCallback(() => {
        if (!correctFlower) return;
        const name = correctFlower.name.toUpperCase();
        const scrambled = name.replace(/\s/g, "").split("").sort(() => 0.5 - Math.random());
        setLetters(scrambled);
        setInput([]);
        setIsShaking(false);
        setIsError(false);
    }, [correctFlower]);

    useEffect(() => {
        generate();
    }, [generate]);

    const handleLetterClick = (letter: string, index: number) => {
        if (hasChecked || isShaking || !correctFlower) return;

        const targetNameRaw = correctFlower.name.toUpperCase();
        const targetNameNoSpaces = targetNameRaw.replace(/\s/g, "");
        const expectedLetter = targetNameNoSpaces[input.length];

        if (letter === expectedLetter) {
            const nextInput = [...input, letter];
            setInput(nextInput);

            // Remove letter from pool
            const nextLetters = [...letters];
            nextLetters.splice(index, 1);
            setLetters(nextLetters);

            if (nextInput.join("") === targetNameNoSpaces) {
                addAnswer(correctFlower.id, true);
                addXp(15);
                onCorrect();
            }
        } else {
            setIsShaking(true);
            setIsError(true);
            loseHeart();
            setInput((prev) => [...prev, letter]);

            setTimeout(() => {
                setIsShaking(false);
                setIsError(false);
                setInput((prev) => prev.slice(0, -1));
            }, 500);
        }
    };

    const handleRemoveLetter = (index: number) => {
        if (hasChecked || isShaking || input.length === 0) return;

        const letter = input[index];
        const nextInput = [...input];
        nextInput.splice(index, 1);
        setInput(nextInput);
        setLetters((prev) => [...prev, letter]);
    };

    return {
        letters,
        input,
        isShaking,
        isError,
        handleLetterClick,
        handleRemoveLetter,
    };
}
