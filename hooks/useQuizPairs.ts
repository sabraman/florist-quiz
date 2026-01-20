"use client";

import { useState, useCallback, useEffect } from "react";
import { flowers } from "@/data/flowers";
import type { Flower } from "@/types/flower";
import { useQuizStore } from "@/store/useQuizStore";
import type { PairState } from "@/types/quiz";

export function useQuizPairs(hasChecked: boolean, onCorrect: () => void): PairState {
    const { addXp, loseHeart } = useQuizStore();
    const [leftOptions, setLeftOptions] = useState<Flower[]>([]);
    const [rightOptions, setRightOptions] = useState<Flower[]>([]);
    const [leftId, setLeftId] = useState<string | null>(null);
    const [rightId, setRightId] = useState<string | null>(null);
    const [clearedIds, setClearedIds] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);

    const generate = useCallback(() => {
        const shuffled = [...flowers].sort(() => 0.5 - Math.random());
        const uniquePriceFlowers: Flower[] = [];
        const seenPrices = new Set<number>();

        for (const flower of shuffled) {
            if (!seenPrices.has(flower.price)) {
                uniquePriceFlowers.push(flower);
                seenPrices.add(flower.price);
            }
            if (uniquePriceFlowers.length === 7) break;
        }

        const selected = uniquePriceFlowers;
        setLeftOptions([...selected].sort(() => 0.5 - Math.random()));
        setRightOptions([...selected].sort(() => 0.5 - Math.random()));
        setClearedIds([]);
        setLeftId(null);
        setRightId(null);
        setIsShaking(false);
    }, []);

    useEffect(() => {
        generate();
    }, [generate]);

    const handleSelect = (side: "left" | "right", id: string) => {
        if (hasChecked || clearedIds.includes(id) || isShaking) return;

        if (side === "left") {
            if (leftId === id) {
                setLeftId(null);
            } else {
                setLeftId(id);
                if (rightId) checkMatch(id, rightId);
            }
        } else {
            if (rightId === id) {
                setRightId(null);
            } else {
                setRightId(id);
                if (leftId) checkMatch(leftId, id);
            }
        }
    };

    const checkMatch = (lId: string, rId: string) => {
        if (lId === rId) {
            const nextCleared = [...clearedIds, lId];
            setClearedIds(nextCleared);
            setLeftId(null);
            setRightId(null);

            if (nextCleared.length === 7) {
                addXp(25);
                onCorrect();
            }
        } else {
            loseHeart();
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
                setLeftId(null);
                setRightId(null);
            }, 500);
        }
    };

    return {
        leftOptions: leftOptions.map(f => ({ id: f.id, name: f.name })),
        rightOptions: rightOptions.map(f => ({ id: f.id, price: String(f.price) })),
        leftId,
        rightId,
        clearedIds,
        isShaking,
        handleSelect,
    };
}
