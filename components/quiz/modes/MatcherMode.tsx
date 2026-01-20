"use client";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Flower } from "@/types/flower";
import { motion, AnimatePresence } from "motion/react";

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
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
} as const;

interface MatcherModeProps {
    target: { id: string; name: string } | null;
    board: { id: string; img: string }[];
    clearedIds: string[];
    handleMatchClick: (id: string) => void;
}

export default function MatcherMode({
    target,
    board,
    clearedIds,
    handleMatchClick
}: MatcherModeProps) {
    return (
        <div className="flex-1 flex flex-col min-h-0">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-none flex flex-col items-center justify-center border-b border-zinc-800 bg-black z-10 p-8 min-h-[20%]"
            >
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter text-center leading-none">
                    Найди: {target?.name}
                </h2>
            </motion.div>

            <div className="flex-1 overflow-hidden">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 h-full"
                >
                    {board.map((item, idx) => {
                        const isCleared = clearedIds.includes(item.id);
                        return (
                            <motion.button
                                key={item.id}
                                variants={itemVar}
                                disabled={isCleared}
                                onClick={() => handleMatchClick(item.id)}
                                animate={isCleared ? { opacity: 0, scale: 0, rotate: 12 } : { opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, ease: "anticipate" }}
                                className={cn(
                                    "relative border-zinc-800 transition-all overflow-hidden",
                                    idx < 4 && "border-b",
                                    idx % 2 === 0 && "border-r",
                                )}
                            >
                                <AspectRatio ratio={1} className="w-full">
                                    <img src={item.img} alt="Flower" className="w-full h-full object-cover" />
                                </AspectRatio>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
