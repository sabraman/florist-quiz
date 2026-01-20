"use client";

import { useQuizStore } from "@/store/useQuizStore";
import Dashboard from "@/components/duolingo/Dashboard";
import TopBar from "@/components/duolingo/TopBar";
import QuizSession from "@/components/quiz/QuizSession";
import Catalog from "@/components/quiz/Catalog";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";

export default function Home() {
    const { mode, setMode } = useQuizStore();
    const x = useMotionValue(0);
    const opacity = useTransform(x, [0, 100], [0, 0.5]);

    const handleDragEnd = (_: any, info: any) => {
        // iOS style back swipe: drag from left side (>80px) with positive velocity
        if (info.offset.x > 80 && info.velocity.x > 0) {
            setMode(null);
        }
        x.set(0);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black relative overflow-hidden touch-none">
            {/* Edge Swipe Gesture Target (iOS Style) */}
            <AnimatePresence>
                {mode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={{ left: 0, right: 0.5 }}
                        onDragEnd={handleDragEnd}
                        style={{ x }}
                        className="fixed inset-y-0 left-0 w-4 z-[100] cursor-grab active:cursor-grabbing"
                    />
                )}
            </AnimatePresence>

            {/* Visual indicator for back swipe */}
            <motion.div
                style={{ opacity }}
                className="fixed inset-y-0 left-0 w-1 bg-white z-[99] pointer-events-none"
            />

            <AnimatePresence mode="wait">
                {mode && mode !== "catalog" ? (
                    <motion.div
                        key="quiz"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black text-white z-50 overflow-hidden flex flex-col"
                    >
                        <QuizSession />
                    </motion.div>
                ) : mode === "catalog" ? (
                    <motion.div
                        key="catalog"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black text-white z-50 overflow-hidden flex flex-col"
                    >
                        <Catalog />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="min-h-screen flex flex-col"
                    >
                        <TopBar />
                        <div className="pt-20 px-0 relative z-10 w-full flex-1">
                            <AnimatePresence mode="wait">
                                {!mode && (
                                    <motion.div
                                        key="dash-content"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
                                    >
                                        <Dashboard />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}