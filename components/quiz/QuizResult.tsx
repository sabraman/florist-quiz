"use client";

import { Star, RefreshCcw, Home } from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";

interface QuizResultProps {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
    onHome: () => void;
}

export default function QuizResult({ score, totalQuestions, onRestart, onHome }: QuizResultProps) {
    const { xp, level } = useQuizStore();
    const currentProgress = xp % 100;

    return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-700 bg-black px-4">
            <Star className="w-20 h-20 text-yellow-500 fill-yellow-500 animate-pulse mb-8" />
            <h2 className="text-5xl font-black text-white mb-1 italic tracking-tighter uppercase">ШИКАРНО!</h2>
            <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
                <span>Уровень {level}</span>
                <span className="w-24 h-1 bg-zinc-900 overflow-hidden inline-block relative -top-[1px]">
                    <div className="h-full bg-yellow-500 transition-all duration-1000" style={{ width: `${currentProgress}%` }} />
                </span>
                <span>{currentProgress}/100 XP</span>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mb-12">
                <div className="p-6 bg-zinc-950 border border-zinc-900">
                    <div className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Очки</div>
                    <div className="text-3xl font-black text-white italic">{score}</div>
                </div>
                <div className="p-6 bg-zinc-950 border border-zinc-900">
                    <div className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Точность</div>
                    <div className="text-3xl font-black text-white italic">{Math.round((score / totalQuestions) * 100)}%</div>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
                <button onClick={onRestart} className="group relative flex items-center justify-center p-4 gap-3 border-2 border-zinc-700 bg-zinc-900 text-white font-black uppercase tracking-widest transition-all active:scale-95 italic text-sm">
                    <RefreshCcw className="w-5 h-5" /> ЕЩЕ РАЗ
                </button>
                <button onClick={onHome} className="group relative flex items-center justify-center p-4 gap-3 border-2 border-zinc-900 bg-zinc-950 text-zinc-500 font-black uppercase tracking-widest transition-all active:scale-95 italic text-sm">
                    <Home className="w-5 h-5" /> МЕНЮ
                </button>
            </div>
        </div>
    );
}
