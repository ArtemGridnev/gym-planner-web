import { useQuery } from "@tanstack/react-query";
import { getExercise } from "../../services/exercisesService";

export function useExercise(id: number | null) {
    return useQuery({
        queryKey: ['exercise', id],
        queryFn: () => getExercise(id as number),
        enabled: id != null,
    });
}
