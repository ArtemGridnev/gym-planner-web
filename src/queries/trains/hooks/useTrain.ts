import { useQuery } from "@tanstack/react-query";
import { getTrain } from "../../../services/trainsService";
import type { Train } from "../../../types/trains/train";

export default function useTrain({ id }: { id: number }) {
    return useQuery<Train>({
        queryKey: ['train', id],
        queryFn: () => getTrain(id)
    })
}