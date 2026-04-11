import { useEffect, useState } from "react";

export default function useDelayedVisibility(active: boolean, delay: number) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!active) {
            setVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [active, delay]);

    return visible;
}