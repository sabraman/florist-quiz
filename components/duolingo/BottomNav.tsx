"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { Home, BookOpen, Medal, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
    const { mode, setMode } = useQuizStore();

    // Mapping active state is simple for now: null mode = Home
    const isHome = mode === null;

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t-2 border-zinc-900 bg-black z-50 pb-safe">
            <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
                <NavButton
                    icon={<Home className="w-7 h-7" />}
                    label="Главная"
                    active={isHome}
                    onClick={() => setMode(null)}
                />
                <NavButton
                    icon={<BookOpen className="w-7 h-7" />}
                    label="Цветы"
                    active={mode === "catalog"}
                    onClick={() => setMode("catalog")}
                />
                <NavButton
                    icon={<Medal className="w-7 h-7" />}
                    label="Рейтинг"
                    active={false}
                    onClick={() => { }}
                />
                <NavButton
                    icon={<User className="w-7 h-7" />}
                    label="Профиль"
                    active={false}
                    onClick={() => { }}
                />
            </div>
        </div>
    );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-95",
                active ? "text-green-500 bg-green-500/10 border-2 border-green-500/30" : "text-zinc-600 hover:text-zinc-400"
            )}
        >
            {icon}
            <span className="text-[10px] font-black uppercase tracking-widest mt-1">{label}</span>
        </button>
    );
}
