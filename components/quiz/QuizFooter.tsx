"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface QuizFooterProps {
    hasChecked: boolean;
    isCorrect: boolean | null;
}

export default function QuizFooter({ hasChecked, isCorrect }: QuizFooterProps) {
    return (
        <footer className="flex-none bg-black border-t border-zinc-800 pb-safe-bottom z-10 w-full min-h-[80px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                {(hasChecked || isCorrect === false) && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                        className="w-full flex flex-col items-center justify-center py-4 px-4"
                    >
                        <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className={cn(
                                "text-2xl font-black uppercase italic tracking-tighter block leading-none",
                                isCorrect ? "text-green-500" : "text-red-500"
                            )}>
                            {isCorrect ? "ВЕРНО" : "ОШИБКА"}
                        </motion.span>
                        {!isCorrect && (
                            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mt-2">
                                ПОПРОБУЙТЕ ЕЩЕ РАЗ
                            </span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    );
}
