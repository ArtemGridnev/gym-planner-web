import { useQuery } from "@tanstack/react-query";
import { getTrains } from "../../services/trainsService";
import type { Train } from "../../types/train";

export default function useTrains() {
    return useQuery<Train[]>({
        queryKey: ['trains'],
        queryFn: getTrains
    });
}