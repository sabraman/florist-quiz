"use client";

import { useState, useCallback, useEffect } from "react";
import { flowers } from "@/data/flowers";
import type { Flower } from "@/types/flower";
import { useQuizStore } from "@/store/useQuizStore";
import type { MatcherState } from "@/types/quiz";

export function useQuizMatcher(hasChecked: boolean, onCorrect: () => void): MatcherState {
    const { addXp, loseHeart } = useQuizStore();
    const [board, setBoard] = useState<Flower[]>([]);
    const [target, setTarget] = useState<Flower | null>(null);
    const [sequence, setSequence] = useState<Flower[]>([]);
    const [clearedIds, setClearedIds] = useState<string[]>([]);

    const generate = useCallback(() => {
        const shuffled = [...flowers].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setBoard([...selected].sort(() => 0.5 - Math.random()));
        const seq = [...selected].sort(() => 0.5 - Math.random());
        setSequence(seq);
        setTarget(seq[0]);
        setClearedIds([]);
    }, []);

    useEffect(() => {
        generate();
    }, [generate]);

    const handleMatchClick = (id: string) => {
        if (hasChecked || clearedIds.includes(id)) return;

        if (id === target?.id) {
            const nextCleared = [...clearedIds, id];
            setClearedIds(nextCleared);

            const remaining = sequence.filter(f => !nextCleared.includes(f.id));
            if (remaining.length > 0) {
                setTarget(remaining[0]);
            } else {
                addXp(20);
                onCorrect();
            }
        } else {
            loseHeart();
        }
    };

    return {
        board: board.map(f => ({ id: f.id, img: f.image })),
        target: target ? { id: target.id, name: target.name } : null,
        clearedIds,
        handleMatchClick,
    };
}
