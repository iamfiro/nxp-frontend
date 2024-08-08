import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
    loadMore: () => void;
    hasMore: boolean;
	children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loadMore, hasMore, children }) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            { threshold: 1 }
        );

        if (lastElementRef.current) observer.current.observe(lastElementRef.current);

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasMore, loadMore]);

    return (
        <>
            {children}
            <div ref={lastElementRef} />
        </>
    );
};

export default InfiniteScroll;
