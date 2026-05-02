import { useEffect, useRef } from "react";

export type UseInfiniteScrollProps = {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    rootMargin?: string;
};

export default function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin = "0px 0px 200px 0px",
}: UseInfiniteScrollProps) {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const target = loadMoreRef.current;
        const root = rootRef.current;

        if (!target || !root || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchNextPage();
                }
            },
            {
                root,
                rootMargin,
                threshold: 0,
            }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin]);

    return { loadMoreRef, rootRef };
}