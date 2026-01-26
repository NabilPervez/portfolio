"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ children, className, ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
