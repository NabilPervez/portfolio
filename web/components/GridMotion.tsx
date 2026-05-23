import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

interface GridMotionProps {
    items?: (string | ReactNode)[];
    gradientColor?: string;
}

const GridMotion = ({ items = [], gradientColor = 'black' }: GridMotionProps) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

    const totalItems = 28;
    const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
    const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

    // Duplicate items to fill the grid if not enough
    while (combinedItems.length < totalItems) {
        combinedItems.push(...combinedItems.slice(0, totalItems - combinedItems.length));
    }

    useEffect(() => {
        rowRefs.current.forEach((row, index) => {
            if (row) {
                const direction = index % 2 === 0 ? 1 : -1;
                
                // Set initial position if moving right so we don't see blank space
                if (direction === 1) {
                    gsap.set(row, { x: '-50%' });
                }

                gsap.to(row, {
                    x: direction === 1 ? '0%' : '-50%',
                    duration: 20 + index * 2, // Slow duration, slightly different per row
                    ease: 'none',
                    repeat: -1,
                });
            }
        });
    }, []);

    return (
        <div className="noscroll loading" ref={gridRef}>
            <section
                className="intro"
                style={{
                    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
                }}
            >
                <div className="gridMotion-container">
                    {[...Array(4)].map((_, rowIndex) => (
                        <div key={rowIndex} className="row" ref={el => { rowRefs.current[rowIndex] = el }}>
                            {[...Array(14)].map((_, itemIndex) => {
                                const index = rowIndex * 7 + (itemIndex % 7);
                                const content = combinedItems[index % combinedItems.length];
                                return (
                                    <div key={itemIndex} className="row__item">
                                        <div className="row__item-inner" style={{ backgroundColor: '#111' }}>
                                            {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/')) ? (
                                                <div
                                                    className="row__item-img"
                                                    style={{
                                                        backgroundImage: `url(${content})`
                                                    }}
                                                ></div>
                                            ) : (
                                                <div className="row__item-content">{content}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="fullview"></div>
            </section>
        </div>
    );
};

export default GridMotion;
