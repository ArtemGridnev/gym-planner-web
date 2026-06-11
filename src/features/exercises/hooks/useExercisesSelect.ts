import { useState } from "react";
import type { Exercise } from "../types/exercise";
import useExercises from "../queries/hooks/useExercises";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import useSelectableListState from "../../../shared/hooks/useSelectableListState";

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

    const {
        loadMoreRef,
        rootRef: listRootRef
    } = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const exercises = data ? data.pages.flat() : null;

    const {
        selected,
        handleCheck,
        cleanSelected
    } = useSelectableListState<Exercise>({ list: data?.pages.flat() });

    const handleSubmit = () => {
        onSubmit(Object.values(selected));
    };

    return {
        exercises,
        isPending,
        isFetchingNextPage,
        hasNextPage,
        selected,
        loadMoreRef,
        listRootRef,
        setFilters,
        handleCheck,
        handleSubmit,
        cleanSelected
    };
}
