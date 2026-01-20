"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { Heart, Flame, Star } from "lucide-react";

export default function TopBar() {
    const { hearts, streak, xp } = useQuizStore();

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 w-full transition-all duration-300 bg-gradient-to-b from-black via-black/90 to-transparent">
            {/* Hearts */}
            <div className="flex items-center gap-1.5 text-red-500">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-bold font-mono">{hearts}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 text-orange-500">
                <Flame className="w-5 h-5 fill-current" />
                <span className="font-bold font-mono">{streak}</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold font-mono">{xp}</span>
            </div>
        </div>
    );
}
