"use client";

import { useEffect, useState } from 'react';

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="text-[12vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 font-display tabular-nums">
                {formatTime(time)}
            </div>
        </div>
    );
}
