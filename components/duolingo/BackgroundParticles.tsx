"use client";

import { useEffect, useState } from "react";

export default function BackgroundParticles() {
    const [particles, setParticles] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        // Generate static random particles on mount to avoid hydration mismatch
        const newParticles = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 4 + 2, // 2-6px
            duration: Math.random() * 20 + 10, // 10-30s
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-zinc-800/30 animate-pulse"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animation: `float ${p.duration}s infinite linear`,
                        animationDelay: `-${p.delay}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                    100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                }
            `}</style>
        </div>
    );
}
