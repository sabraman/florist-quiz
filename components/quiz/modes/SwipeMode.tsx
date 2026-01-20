"use client";

import type { Flower } from "@/types/flower";
import SwipeCard from "../SwipeCard";

interface SwipeModeProps {
    correctFlower: Flower | null;
    swipeLabel: string;
    handleSwipe: (direction: "right" | "left") => void;
}

export default function SwipeMode({
    correctFlower,
    swipeLabel,
    handleSwipe
}: SwipeModeProps) {
    if (!correctFlower) return null;

    return (
        <div className="flex-1 flex items-center justify-center p-6 h-full overflow-hidden">
            <SwipeCard
                flower={correctFlower}
                label={swipeLabel}
                onSwipe={handleSwipe}
            />
        </div>
    );
}
