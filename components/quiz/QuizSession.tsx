"use client";

import { motion, AnimatePresence } from "motion/react";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import QuizHeader from "./QuizHeader";
import QuizResult from "./QuizResult";
import GameOver from "./GameOver";
import QuizModes from "./QuizModes";
import QuizFooter from "./QuizFooter";

export default function QuizSession() {
    const {
        mode,
        currentLevel,
        TOTAL_QUESTIONS,
        correctFlower,
        isFinished,
        hasChecked,
        hearts,
        score,
        handleRestart,
        setMode,
        restoreHearts,
        mc,
        spelling,
        matcher,
        swipes,
        pairs,
    } = useQuizLogic();

    if (isFinished) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
            >
                <QuizResult
                    score={score}
                    totalQuestions={TOTAL_QUESTIONS}
                    onRestart={handleRestart}
                    onHome={() => setMode(null)}
                />
            </motion.div>
        );
    }

    if (hearts === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
            >
                <GameOver
                    onRestore={() => {
                        restoreHearts();
                        handleRestart();
                    }}
                    onHome={() => setMode(null)}
                />
            </motion.div>
        );
    }

    // Determine correctness for footer feedback
    let isCorrect = true;
    if (mode === "image-to-names" || mode === "name-to-images" || mode === "prices") {
        isCorrect = mc.isCorrect ?? true;
    } else if (mode === "spelling") {
        isCorrect = !spelling.isError;
    }

    return (
        <div className="flex flex-col h-[100dvh] bg-black text-white overflow-hidden">
            <QuizHeader
                currentLevel={currentLevel}
                totalQuestions={TOTAL_QUESTIONS}
                hearts={hearts}
                onBack={() => setMode(null)}
            />

            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentLevel}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 flex flex-col"
                    >
                        <QuizModes
                            mode={mode}
                            correctFlower={correctFlower}
                            hasChecked={hasChecked}
                            mc={mc}
                            spelling={spelling}
                            matcher={matcher}
                            swipes={swipes}
                            pairs={pairs}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <QuizFooter hasChecked={hasChecked} isCorrect={isCorrect} />
        </div>
    );
}
