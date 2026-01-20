"use client";

import { useEffect, useState, useCallback } from "react";
import { flowers } from "@/data/flowers";
import { useQuizStore } from "@/store/useQuizStore";
import type { Flower } from "@/types/flower";

// Import modular hooks
import { useQuizMultipleChoice } from "./useQuizMultipleChoice";
import { useQuizSpelling } from "./useQuizSpelling";
import { useQuizMatcher } from "./useQuizMatcher";
import { useQuizSwipes } from "./useQuizSwipes";
import { useQuizPairs } from "./useQuizPairs";

const TOTAL_QUESTIONS = 5;

export function useQuizLogic() {
    const {
        mode, score, resetScore, setMode, hearts,
        checkStreak, restoreHearts, finishLevel
    } = useQuizStore();

    const [currentLevel, setCurrentLevel] = useState(0);
    const [correctFlower, setCorrectFlower] = useState<Flower | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    const generateQuestion = useCallback(() => {
        if (currentLevel >= TOTAL_QUESTIONS) {
            setIsFinished(true);
            return;
        }

        const shuffled = [...flowers].sort(() => 0.5 - Math.random());
        setCorrectFlower(shuffled[0]);
        setHasChecked(false);
    }, [currentLevel]);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    const handleNext = useCallback(() => {
        if (currentLevel + 1 < TOTAL_QUESTIONS) {
            setCurrentLevel((prev) => prev + 1);
        } else {
            setIsFinished(true);
            checkStreak();
            finishLevel();
            restoreHearts();
        }
    }, [currentLevel, checkStreak, finishLevel, restoreHearts]);

    useEffect(() => {
        if (!hasChecked) return;
        const timer = setTimeout(() => {
            handleNext();
        }, 1000);
        return () => clearTimeout(timer);
    }, [hasChecked, handleNext]);

    const onCorrect = () => setHasChecked(true);

    // Initialize mode-specific hooks
    const mc = useQuizMultipleChoice(correctFlower, hasChecked, onCorrect);
    const spelling = useQuizSpelling(correctFlower, hasChecked, onCorrect);
    const matcher = useQuizMatcher(hasChecked, onCorrect);
    const swipes = useQuizSwipes(correctFlower, hasChecked, onCorrect);
    const pairs = useQuizPairs(hasChecked, onCorrect);

    const handleRestart = () => {
        resetScore();
        setCurrentLevel(0);
        setIsFinished(false);
    };

    return {
        mode,
        currentLevel,
        TOTAL_QUESTIONS,
        correctFlower,
        isFinished,
        hasChecked,
        hearts,
        score,
        handleRestart,
        setMode,
        restoreHearts,

        // Mode Specific Exports (Flattened for easier migration if needed, or kept grouped)
        mc,
        spelling,
        matcher,
        swipes,
        pairs,
    };
}
