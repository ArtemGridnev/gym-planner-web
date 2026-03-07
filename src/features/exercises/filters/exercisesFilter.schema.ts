import type { ExerciseCategory } from '../types/exerciseCategory';
import type { FilterFieldSchema } from '../../../shared/types/filterFieldSchema';
import type { SearchSelectOption } from '../../../shared/types/form/formFieldSchema';

export const getExerciseFilterFields = (categories: SearchSelectOption<ExerciseCategory>[]): FilterFieldSchema[] => [
    {
        label: "Search",
        name: "search",
        type: "search",
        debounce: 300
    },
    {
        label: "Category",
        name: "category",
        type: "searchSelectMultiple",
        options: categories
    }
];