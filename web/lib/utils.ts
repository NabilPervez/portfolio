import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function mapImageToLocal(url: string | undefined): string {
    if (!url) return '';

    // If it's already a local path, return it
    if (url.startsWith('/')) return url;

    // If it's a remote URL, we might want to map it to a downloaded asset
    // For now, we'll assume assets are in /images/portfolio/ matching the filename
    try {
        const urlObj = new URL(url);
        const filename = urlObj.pathname.split('/').pop();
        if (filename) {
            return `/images/portfolio/${filename}`;
        }
    } catch (e) {
        // If invalid URL, allow it if it looks like a filename
        return `/images/portfolio/${url}`;
    }

    return url;
}
