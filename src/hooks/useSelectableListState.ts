import { useState } from "react";

type Identifiable = {
    id: number | string;
  };

type useSelectableListStateProps<T extends Identifiable> = {
    list: T[] | undefined;
};

export default function useSelectableListState<T extends Identifiable>({ list }: useSelectableListStateProps<T>) {
    const [selected, setSelected] = useState<Record<string, T>>({});

    const handleCheck = (id: string, checked: boolean) => {
        setSelected(prev => {
            const selected = { ...prev };

            if (checked) {
                const exercise = list?.find(item => +item.id === +id);
                if (exercise) selected[id] = exercise;
            } else {
                delete selected[id];
            }

            return selected;
        });
    };

    const cleanSelected = () => {
        setSelected({});
    };

    return ({
        selected,
        handleCheck,
        cleanSelected
    });
}