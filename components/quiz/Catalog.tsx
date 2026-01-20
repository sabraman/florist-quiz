"use client";

import { flowers } from "@/data/flowers";
import { useQuizStore } from "@/store/useQuizStore";
import { ChevronLeft } from "lucide-react";
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
} as const;

export default function Catalog() {
    const { setMode } = useQuizStore();

    return (
        <div className="flex flex-col h-[100dvh] bg-black text-white overflow-hidden">
            {/* Sticky Header - Identical to QuizHeader layout */}
            <header className="flex-none grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 border-b border-zinc-800 bg-black pt-safe-top z-10">
                <button
                    onClick={() => setMode(null)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-zinc-900 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-zinc-400" />
                </button>
                <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">КАТАЛОГ</h2>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Все цветы ({flowers.length})</span>
                </div>
                <div className="w-10 h-10" /> {/* Spacer for symmetry */}
            </header>

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2"
                >
                    {[...flowers].sort((a, b) => a.name.localeCompare(b.name)).map((flower) => (
                        <motion.div
                            key={flower.id}
                            variants={item}
                            className="flex flex-col bg-black border-b border-r border-zinc-900 overflow-hidden group"
                        >
                            <div className="aspect-square relative bg-zinc-950 p-2 overflow-hidden">
                                <img
                                    src={flower.image}
                                    alt={flower.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4 flex flex-col justify-center min-h-[70px] border-t border-zinc-900 group-hover:bg-zinc-900/40 transition-colors">
                                <h4 className="text-[10px] font-black text-zinc-500 leading-tight uppercase tracking-tighter truncate mb-1">{flower.name}</h4>
                                <p className="text-xl font-black text-white italic leading-none">{flower.price}₽</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
