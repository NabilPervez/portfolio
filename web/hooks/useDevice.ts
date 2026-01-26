"use client";

import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";
type OS = "ios" | "android" | "other";

interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    type: DeviceType;
    os: OS;
    isThinking: boolean; // Just a fun prop to match the vibe
}

export function useDevice(): DeviceInfo {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        type: "desktop",
        os: "other",
        isThinking: true
    });

    useEffect(() => {
        const handleResize = () => {
            const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent || navigator.vendor || (window as any).opera;
            const width = window.innerWidth;

            // Simple OS detection
            let os: OS = "other";
            if (/android/i.test(userAgent)) {
                os = "android";
            } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
                os = "ios";
            }

            // Simple responsive breakpoints
            let type: DeviceType = "desktop";
            if (width < 768) {
                type = "mobile";
            } else if (width >= 768 && width < 1024) {
                type = "tablet";
            }

            setDeviceInfo({
                isMobile: type === "mobile",
                isTablet: type === "tablet",
                isDesktop: type === "desktop",
                type,
                os,
                isThinking: false
            });
        };

        // Initial check
        handleResize();

        // Listen for resize
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return deviceInfo;
}
