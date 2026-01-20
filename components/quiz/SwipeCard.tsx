"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Flower } from "@/types/flower";

interface SwipeCardProps {
    flower: Flower;
    label: string;
    onSwipe: (direction: "right" | "left") => void;
}

export default function SwipeCard({ flower, label, onSwipe }: SwipeCardProps) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const yesOpacity = useTransform(x, [50, 150], [0, 1]);
    const noOpacity = useTransform(x, [-150, -50], [1, 0]);

    const handleDragEnd = (_e: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe("right");
        } else if (info.offset.x < -100) {
            onSwipe("left");
        }
    };

    return (
        <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000">
            <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing touch-none"
            >
                {/* Visual Feedbacks */}
                <motion.div
                    style={{ opacity: yesOpacity }}
                    className="absolute top-8 left-8 z-20 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-15deg]"
                >
                    <span className="text-green-500 font-black text-4xl uppercase">YES</span>
                </motion.div>

                <motion.div
                    style={{ opacity: noOpacity }}
                    className="absolute top-8 right-8 z-20 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[15deg]"
                >
                    <span className="text-red-500 font-black text-4xl uppercase">NO</span>
                </motion.div>

                <div className="w-full h-full relative">
                    <img
                        src={flower.image}
                        alt="Flower"
                        className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center gap-2">

                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter text-center leading-none">
                        {label}
                    </h2>
                </div>
            </motion.div>

            {/* Hint icons behind the card */}
            <div className="absolute inset-0 -z-10 flex items-center justify-between px-12">
                <div className="p-4 rounded-full bg-red-500/20 border border-red-500/50">
                    <X className="w-8 h-8 text-red-500" />
                </div>
                <div className="p-4 rounded-full bg-green-500/20 border border-green-500/50">
                    <Check className="w-8 h-8 text-green-500" />
                </div>
            </div>
        </div>
    );
}
