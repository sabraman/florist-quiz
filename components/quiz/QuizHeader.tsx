"use client";

import { ChevronLeft, HeartCrack } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface QuizHeaderProps {
    currentLevel: number;
    totalQuestions: number;
    hearts: number;
    onBack: () => void;
}

export default function QuizHeader({ currentLevel, totalQuestions, hearts, onBack }: QuizHeaderProps) {
    const progress = (currentLevel / totalQuestions) * 100;

    return (
        <header className="flex-none grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 border-b border-zinc-800 bg-black pt-safe-top z-10">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center hover:bg-zinc-900 transition-colors">
                <ChevronLeft className="w-6 h-6 text-zinc-400" />
            </button>
            <div className="flex flex-col gap-1 w-full justify-self-center">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2">
                    <span>Вопрос {currentLevel + 1}</span>
                    <span>из {totalQuestions}</span>
                </div>
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        className="h-full bg-white transition-all"
                    />
                </div>
            </div>
            <div className="flex items-center gap-1 justify-self-end text-zinc-500 font-mono text-xs">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={hearts}
                        initial={{ scale: 1.5, color: "#ef4444" }}
                        animate={{ scale: 1, color: hearts < 2 ? "#ef4444" : "#ffffff" }}
                        className="font-black"
                    >
                        {hearts}
                    </motion.span>
                </AnimatePresence>
                <span>/ 5</span>
                <motion.div
                    animate={hearts < 2 ? { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.5 } } : {}}
                >
                    <HeartCrack className={cn("w-3 h-3 ml-1 fill-current", hearts < 2 ? "text-red-500" : "text-zinc-500")} />
                </motion.div>
            </div>
        </header>
    );
}
