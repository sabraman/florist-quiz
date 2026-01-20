"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Flower } from "@/types/flower";

const lettersContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
} as const;

const letterItem = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
} as const;

interface SpellingModeProps {
    correctFlower: Flower | null;
    letters: string[];
    input: string[];
    isShaking: boolean;
    isError: boolean;
    hasChecked: boolean;
    handleLetterClick: (letter: string, index: number) => void;
    handleRemoveLetter: (index: number) => void;
}

export default function SpellingMode({
    correctFlower,
    letters,
    input,
    isShaking,
    isError,
    hasChecked,
    handleLetterClick,
    handleRemoveLetter
}: SpellingModeProps) {
    if (!correctFlower) return null;

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-none w-full">
                <AspectRatio ratio={1}>
                    <img src={correctFlower.image} alt="Flower" className="w-full h-full object-cover" />
                </AspectRatio>
            </div>

            <motion.div
                animate={isShaking ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } } : {}}
                className="flex-1 p-4 sm:p-8 flex flex-col items-center gap-8 max-h-full overflow-y-auto"
            >
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4">
                    {correctFlower.name.split("").map((char, i) => {
                        const isSpace = char === " ";
                        const nameUpToThis = correctFlower.name.slice(0, i);
                        const inputIndex = nameUpToThis.replace(/\s/g, "").length;
                        const letter = isSpace ? "" : input[inputIndex];
                        const isCurrentError = isError && !isSpace && letter && inputIndex === input.length - 1;

                        return (
                            <motion.button
                                key={i}
                                layout
                                initial={false}
                                animate={isCurrentError ? { scale: [1, 1.1, 1], backgroundColor: "rgba(239, 68, 68, 0.2)" } : {}}
                                disabled={isSpace || !letter || hasChecked || isShaking}
                                onClick={() => handleRemoveLetter(inputIndex)}
                                className={cn(
                                    "flex items-center justify-center font-black italic transition-all shrink-0 border-b-4",
                                    isSpace ? "w-4 sm:w-8 h-12 sm:h-16 border-none" : "w-10 sm:w-12 h-12 sm:h-16 border-b-4",
                                    letter ? "border-white bg-zinc-900" : "border-zinc-800 text-zinc-800",
                                    correctFlower.name.length > 12 ? "text-xl sm:text-2xl w-8 sm:w-10" : "text-2xl sm:text-4xl",
                                    isCurrentError && "border-red-500 text-red-500",
                                    !isSpace && letter && !hasChecked && !isShaking && "hover:bg-zinc-800 active:scale-95 cursor-pointer"
                                )}
                            >
                                {isSpace ? "" : letter || "_"}
                            </motion.button>
                        );
                    })}
                </div>
                <motion.div
                    variants={lettersContainer}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-lg px-2 mt-auto pb-12"
                >
                    {letters.map((letter, i) => (
                        <motion.button
                            key={i}
                            variants={letterItem}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleLetterClick(letter, i)}
                            className={cn(
                                "flex items-center justify-center border-2 border-zinc-700 bg-zinc-900 font-black italic transition-all",
                                letters.length > 12 ? "w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl" : "w-12 h-12 sm:w-16 sm:h-16 text-xl sm:text-3xl"
                            )}
                        >
                            {letter}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
