import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { deleteExercise } from "../../services/exercisesService";
import type { Exercise } from "../../types/exercise";

export default function useDeleteExercise() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteExercise,
        onMutate: async (exerciseId: number) => {
            await queryClient.cancelQueries({ queryKey: ['exercises'] });
            
            const previousData = queryClient.getQueryData<InfiniteData<Exercise[]>>(['exercises']);
            
            queryClient.setQueryData(['exercises'], (old: InfiniteData<Exercise[]> | undefined) => 
              old && old.pages ? {
                ...old,
                pages: old.pages.map(page => page.filter(ex => ex.id !== exerciseId))
              } : old
            );
            
            return { previousData };
        },
        onError: (err, _exerciseId, context: any) => {
            if (context?.prev) {
                queryClient.setQueryData(['exercises'], context.prev);
            }

            console.error("Error deleting exercise:", err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
        },
    });
}