"use client";

import { useQuizStore, type QuizMode } from "@/store/useQuizStore";
import { List, Image as ImageIcon, Tag, BookOpen, HandMetal } from "lucide-react";

export default function ModeSelector() {
    const { setMode } = useQuizStore();

    const modes = [
        {
            id: "name-to-images",
            title: "Фото-квиз",
            desc: "Угадай цветок по фото",
            icon: ImageIcon,
            color: "text-blue-400",
            borderColor: "border-blue-900/50",
            shadowColor: "shadow-blue-900/20",
        },
        {
            id: "image-to-names",
            title: "Названия",
            desc: "Выбери имя цветка",
            icon: List,
            color: "text-pink-400",
            borderColor: "border-pink-900/50",
            shadowColor: "shadow-pink-900/20",
        },
        {
            id: "prices",
            title: "Цены",
            desc: "Угадай стоимость",
            icon: Tag,
            color: "text-orange-400",
            borderColor: "border-orange-900/50",
            shadowColor: "shadow-orange-900/20",
        },
        {
            id: "swipes",
            title: "Свайпы",
            desc: "Верю / Не верю",
            icon: HandMetal,
            color: "text-purple-400",
            borderColor: "border-purple-900/50",
            shadowColor: "shadow-purple-900/20",
        },
        {
            id: "select-pair",
            title: "Парочки",
            desc: "Найди связь: Имя - Цена",
            icon: List,
            color: "text-red-400",
            borderColor: "border-red-900/50",
            shadowColor: "shadow-red-900/20",
        },
    ];

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 gap-4">
                {modes.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setMode(m.id as QuizMode)}
                        className={`btn-chunky group flex items-center gap-5 p-6 rounded-[2rem] bg-zinc-950 border border-zinc-900 text-left`}
                    >
                        <div className={`p-4 rounded-2xl bg-black border border-zinc-900 ${m.color}`}>
                            <m.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-black tracking-tight text-white mb-0.5 uppercase italic">{m.title}</h3>
                            <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest leading-none">{m.desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={() => setMode("catalog")}
                className="mt-6 flex items-center justify-center gap-3 p-5 rounded-2xl border border-dashed border-zinc-800 text-zinc-600 hover:text-white hover:border-zinc-500 transition-all font-black text-[10px] uppercase tracking-[0.25em]"
            >
                <BookOpen className="w-4 h-4" />
                Каталог цветов
            </button>
        </div>
    );
}

