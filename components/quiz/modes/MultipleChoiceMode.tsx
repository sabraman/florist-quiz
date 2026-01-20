"use client";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Flower } from "@/types/flower";
import type { QuizMode } from "@/store/useQuizStore";
import { motion } from "motion/react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
} as const;

const item = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
} as const;

interface MultipleChoiceModeProps {
    mode: QuizMode | null;
    correctFlower: Flower | null;
    options: Flower[];
    selectedId: string | null;
    hasChecked: boolean;
    wrongIds: string[];
    onSelect: (id: string) => void;
}

export default function MultipleChoiceMode({
    mode,
    correctFlower,
    options,
    selectedId,
    hasChecked,
    wrongIds,
    onSelect
}: MultipleChoiceModeProps) {
    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Mode Prompts */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "flex-none flex flex-col items-center justify-center border-b border-zinc-800 bg-black z-10",
                    mode === "name-to-images" ? "p-8 min-h-[20%]" : "p-0"
                )}
            >
                {mode === "name-to-images" && (
                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter text-center leading-none">
                        {correctFlower?.name}
                    </h2>
                )}

                {(mode === "image-to-names" || mode === "prices") && correctFlower && (
                    <div className="w-full">
                        <AspectRatio ratio={1}>
                            <img src={correctFlower.image} alt="Flower" className="w-full h-full object-cover" />
                        </AspectRatio>
                    </div>
                )}
            </motion.div>

            <div className="flex-1 overflow-hidden">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 h-full"
                >
                    {options.map((option, idx) => {
                        const isSelected = selectedId === option.id;
                        const isRight = hasChecked && option.id === correctFlower?.id;
                        const isWrong = wrongIds.includes(option.id);
                        return (
                            <motion.button
                                key={option.id}
                                variants={item}
                                whileTap={{ scale: 0.95 }}
                                disabled={hasChecked || isWrong}
                                onClick={() => onSelect(option.id)}
                                className={cn(
                                    "relative flex flex-col items-center justify-center border-zinc-800 transition-colors",
                                    idx < 2 && "border-b",
                                    idx % 2 === 0 && "border-r",
                                    isSelected && !hasChecked && !isWrong && "bg-zinc-900 ring-4 ring-inset ring-white/10",
                                    isWrong && "bg-red-950/20 opacity-40 grayscale",
                                    isRight && "bg-green-950/30"
                                )}
                            >
                                {mode === "name-to-images" ? (
                                    <AspectRatio ratio={1} className="w-full">
                                        <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                                    </AspectRatio>
                                ) : mode === "image-to-names" ? (
                                    <span className="text-sm font-black uppercase tracking-tight px-4 text-center">{option.name}</span>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl font-black italic">{option.price}</span>
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
