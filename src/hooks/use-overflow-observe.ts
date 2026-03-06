import { useEffect, useRef, useState, useCallback } from 'react';

export const useIntersectionOverflow = <
    T extends HTMLElement,
    K extends HTMLElement
>() => {
    const containerRef = useRef<T>(null);
    const buttonRef = useRef<K>(null);

    const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
    const observerRef = useRef<IntersectionObserver>(null);

    const [chips, setChips] = useState<NodeListOf<Element>>()

    const observe = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const newHiddenIndices: number[] = [];

                entries.forEach((entry, index) => {
                    if (entry.intersectionRatio < 1) {
                        newHiddenIndices.push(index);
                    }
                });

                if (newHiddenIndices.join(',') !== hiddenIndices.join(',')) {
                    setHiddenIndices(newHiddenIndices);
                }
            },
            {
                root: containerRef.current,
                rootMargin: `0px ${0}px 0px 0px`,
                threshold: 1.0 // Элемент должен быть видим полностью
            }
        );
        let currentOffset = -4;

        chips?.forEach((chip, index) => {
            if (!hiddenIndices.includes(index)) {
                currentOffset += (chip.clientWidth + 4);
            }

            return observerRef.current?.observe(chip);
        });

        console.log(containerRef.current.clientWidth, currentOffset);

        buttonRef.current?.style.setProperty('right', `${containerRef.current.clientWidth - currentOffset}px`);
    }, [chips, hiddenIndices]);

    useEffect(() => {
        if (!containerRef.current) {
            return
        };

        const resizeObserver = new ResizeObserver(observe);

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
            observerRef.current?.disconnect();
        };
    }, [observe]);

    useEffect(() => {
        if (containerRef.current) {
            setChips(containerRef.current.childNodes as NodeListOf<Element>)
        }
    // eslint-disable-next-line react-hooks/refs
    }, [containerRef.current?.childNodes])

    return {
        containerRef,
        buttonRef,
        hiddenIndices,
    };
};
