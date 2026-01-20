"use client";

import { HeartCrack, RefreshCcw } from "lucide-react";

interface GameOverProps {
    onRestore: () => void;
    onHome: () => void;
}

export default function GameOver({ onRestore, onHome }: GameOverProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-700 bg-black px-4">
            <HeartCrack className="w-20 h-20 text-red-500 fill-red-500 mb-8" />
            <h2 className="text-4xl font-black text-white mb-2 italic tracking-tighter uppercase leading-none">ЖИЗНИ <br /> ЗАКОНЧИЛИСЬ</h2>
            <p className="text-zinc-500 text-sm mb-12 mt-2 font-mono uppercase tracking-tight">Попробуйте снова, когда восстановите силы</p>
            <div className="flex flex-col gap-3 w-full">
                <button onClick={onRestore} className="p-4 border-2 border-white bg-white text-black font-black uppercase tracking-widest transition-all active:scale-95 text-sm italic">
                    <RefreshCcw className="w-5 h-5 inline-block mr-2 -mt-1" /> ВОССТАНОВИТЬ
                </button>
                <button onClick={onHome} className="p-4 border-2 border-zinc-900 bg-transparent text-zinc-500 font-black uppercase tracking-widest transition-all active:scale-95 text-sm">
                    МЕНЮ
                </button>
            </div>
        </div>
    );
}
