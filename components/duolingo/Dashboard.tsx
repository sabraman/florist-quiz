"use client";

import { useQuizStore, QuizMode } from "@/store/useQuizStore";
import { BookOpen, Type, Grid3X3, Layers, Tag, HelpCircle, HandMetal, List } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const MODES: { id: QuizMode; title: string; description: string; icon: any; color: string }[] = [
    {
        id: "image-to-names",
        title: "Названия",
        description: "Один цветок — четыре имени",
        icon: Type,
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
        id: "name-to-images",
        title: "Фотографии",
        description: "Одно имя — четыре фото",
        icon: Grid3X3,
        color: "text-green-500 bg-green-500/10 border-green-500/20"
    },
    {
        id: "spelling",
        title: "Буквы",
        description: "Собери название из букв",
        icon: Layers,
        color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
    },
    {
        id: "matcher",
        title: "Найди пару",
        description: "Убери все 6 картинок",
        icon: HelpCircle,
        color: "text-orange-500 bg-orange-500/10 border-orange-500/20"
    },
    {
        id: "prices",
        title: "Цены",
        description: "Сколько стоит этот цветок?",
        icon: Tag,
        color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
    },
    {
        id: "swipes",
        title: "Свайпы",
        description: "Верю / Не верю (iOS style)",
        icon: HandMetal,
        color: "text-purple-500 bg-purple-500/10 border-zinc-500/20"
    },
    {
        id: "select-pair",
        title: "Парочки",
        description: "Найди цену для цветка",
        icon: List,
        color: "text-red-500 bg-red-500/10 border-red-500/20"
    },
    {
        id: "catalog",
        title: "Каталог",
        description: "Все цветы в одном месте",
        icon: BookOpen,
        color: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
} as const;

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
} as const;

export default function Dashboard() {
    const { setMode, hearts, restoreHearts } = useQuizStore();

    const handleModeSelect = (modeId: QuizMode) => {
        if (hearts === 0) restoreHearts();
        setMode(modeId);
    };

    return (
        <div className="flex flex-col w-full h-[calc(100vh-80px)] bg-black overflow-hidden">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex-1 flex flex-col overflow-y-auto"
            >
                {MODES.map((mode) => (
                    <motion.button
                        key={mode.id}
                        variants={item}
                        whileHover={{ backgroundColor: "rgba(24, 24, 27, 0.5)", x: 4 }}
                        whileTap={{ scale: 0.98, x: 0 }}
                        onClick={() => handleModeSelect(mode.id)}
                        className={cn(
                            "group relative flex items-center p-8 border-b border-zinc-900 bg-black transition-all overflow-hidden text-left",
                        )}
                    >
                        <div className="z-10 flex-1">
                            <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none group-active:text-zinc-400 transition-colors">
                                {mode.title}
                            </h3>
                        </div>

                        <div className="opacity-10 transition-transform group-hover:rotate-6 group-hover:scale-110 absolute inset-0 flex items-center justify-end pr-8 pointer-events-none">
                            <mode.icon className="w-24 h-24 rotate-12" />
                        </div>

                        {/* Hover accent */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}
