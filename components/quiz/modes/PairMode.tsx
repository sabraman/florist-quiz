"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { Flower } from "@/types/flower";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
} as const;

const itemVar = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
} as const;

const itemVarRight = {
    hidden: { x: 20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
} as const;

interface PairModeProps {
    leftOptions: { id: string; name: string }[];
    rightOptions: { id: string; price: string }[];
    leftId: string | null;
    rightId: string | null;
    clearedIds: string[];
    isShaking: boolean;
    hasChecked: boolean;
    handleSelect: (side: "left" | "right", id: string) => void;
}

export default function PairMode({
    leftOptions,
    rightOptions,
    leftId,
    rightId,
    clearedIds,
    isShaking,
    hasChecked,
    handleSelect
}: PairModeProps) {
    return (
        <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } } : {}}
            className="flex items-center justify-center gap-4 p-4 h-full w-full max-w-2xl mx-auto"
        >
            {/* Left Column: Names */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex-1 flex flex-col gap-3"
            >
                {leftOptions.map((item) => {
                    const isCleared = clearedIds.includes(item.id);
                    const isSelected = leftId === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            variants={itemVar}
                            layout
                            disabled={isCleared || hasChecked}
                            onClick={() => handleSelect("left", item.id)}
                            animate={isCleared ? { opacity: 0, scale: 0.8, x: -20 } : { opacity: 1, scale: 1, x: 0 }}
                            className={cn(
                                "h-20 px-4 rounded-2xl border-2 transition-all text-sm font-black uppercase tracking-tight text-center",
                                isSelected ? "bg-zinc-800 border-white text-white" : "bg-black border-zinc-800 text-zinc-400"
                            )}
                        >
                            {item.name}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Right Column: Prices */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex-1 flex flex-col gap-3"
            >
                {rightOptions.map((item) => {
                    const isCleared = clearedIds.includes(item.id);
                    const isSelected = rightId === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            variants={itemVarRight}
                            layout
                            disabled={isCleared || hasChecked}
                            onClick={() => handleSelect("right", item.id)}
                            animate={isCleared ? { opacity: 0, scale: 0.8, x: 20 } : { opacity: 1, scale: 1, x: 0 }}
                            className={cn(
                                "h-20 px-4 rounded-2xl border-2 transition-all text-2xl font-black italic text-center",
                                isSelected ? "bg-zinc-800 border-white text-white" : "bg-black border-zinc-800 text-zinc-400"
                            )}
                        >
                            {item.price}
                        </motion.button>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
