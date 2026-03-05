import { useMemo, useState } from "react";
import type { SelectableDataCardListRowProps } from "../../components/dataCardList/SelectableDataCardList";
import type { Exercise } from "../../types/exercises/exercise";
import { FitnessCenterOutlined } from "@mui/icons-material";
import useExercises from "../../queries/exercises/hooks/useExercises";
import useInfiniteScroll from "../useInfiniteScroll";
import useSelectableListState from "../useSelectableListState";

type useExercisesSelectProps = {
    onSubmit: (exercises: Exercise[]) => void;
};

export default function useExercisesSelect({ onSubmit }: useExercisesSelectProps) {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const { 
        isPending,
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useExercises({ filters });

    const loadMoreRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const rows = useMemo<SelectableDataCardListRowProps[] | null>(() => {
        if (!data) return null;

        return data.pages.flat().map(exercise => ({
            id: exercise.id.toString(),
            icon: FitnessCenterOutlined,
            title: `${exercise.name} - ${exercise.category.name}`,
            data: {
                id: exercise.id,
                description: exercise.description,
                sets: exercise.sets,
                reps: exercise.reps,
                durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                weight: exercise.weight && `${exercise.weight} kg`
            }
        }));
    }, [data]);

    const {
        selected,
        handleCheck,
        cleanSelected
    } = useSelectableListState<Exercise>({ list: data?.pages.flat() });

    const handleSubmit = () => {
        onSubmit(Object.values(selected));
    };

    return {
        rows,
        isPending,
        hasNextPage,
        selected,
        loadMoreRef,
        setFilters,
        handleCheck,
        handleSubmit,
        cleanSelected
    };
}