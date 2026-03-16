import { useEffect, useMemo } from 'react';
import useFilters from '../../../shared/hooks/filters/useFilters'
import ToolbarFilters from '../../../shared/components/toolbar/ToolbarFilters';
import { useExerciseCategories } from '../queries/hooks/useExerciseCategories';
import { getExerciseFilterFields } from '../filters/exercisesFilter.schema';
import type { ExerciseCategory } from '../types/exerciseCategory';
import type { SearchSelectOption } from '../../../shared/types/form/formFieldSchema';

type ExercisesListFiltersProps = {
    onChange: (filters: Record<string, string>) => void
};

export default function ExercisesListFilters({ onChange }: ExercisesListFiltersProps) {
    const {
        data: categories
    } = useExerciseCategories();

    const fields = useMemo(() => {
        if (!categories) return [];

        const options = categories.map((category: ExerciseCategory) => ({ id: category.id, value: category, label: category.name } as SearchSelectOption));

        return getExerciseFilterFields(options);
    }, [categories]);

    const {
        filters,
        values,
        handleChange
    } = useFilters(fields);

    useEffect(() => {
        onChange(filters);
    }, [filters]);

    return (
        <ToolbarFilters 
            fields={fields} 
            filters={values} 
            handleChange={handleChange} 
            data-testid="exercises-list-filters"
        />
    );
}