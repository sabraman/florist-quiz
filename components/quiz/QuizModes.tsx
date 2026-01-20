"use client";

import type { Flower } from "@/types/flower";
import type { QuizMode, MultipleChoiceState, SpellingState, MatcherState, SwipeState, PairState } from "@/types/quiz";

// Import modular components
import MultipleChoiceMode from "./modes/MultipleChoiceMode";
import SpellingMode from "./modes/SpellingMode";
import MatcherMode from "./modes/MatcherMode";
import SwipeMode from "./modes/SwipeMode";
import PairMode from "./modes/PairMode";

interface QuizModesProps {
    mode: QuizMode | null;
    correctFlower: Flower | null;
    hasChecked: boolean;
    mc: MultipleChoiceState;
    spelling: SpellingState;
    matcher: MatcherState;
    swipes: SwipeState;
    pairs: PairState;
}

export default function QuizModes({
    mode,
    correctFlower,
    hasChecked,
    mc,
    spelling,
    matcher,
    swipes,
    pairs
}: QuizModesProps) {
    return (
        <main className="flex-1 flex flex-col min-h-0 relative">
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>

            {(mode === "image-to-names" || mode === "name-to-images" || mode === "prices") && (
                <MultipleChoiceMode
                    mode={mode}
                    correctFlower={correctFlower}
                    {...mc}
                    hasChecked={hasChecked}
                    onSelect={mc.handleSelect}
                />
            )}

            {mode === "spelling" && (
                <SpellingMode
                    correctFlower={correctFlower}
                    {...spelling}
                    hasChecked={hasChecked}
                />
            )}

            {mode === "matcher" && (
                <MatcherMode
                    {...matcher}
                />
            )}

            {mode === "swipes" && (
                <SwipeMode
                    correctFlower={correctFlower}
                    {...swipes}
                />
            )}

            {mode === "select-pair" && (
                <PairMode
                    {...pairs}
                    hasChecked={hasChecked}
                />
            )}
        </main>
    );
}
