import { renderHook } from "@testing-library/react";
import useSelectableListState from "./useSelectableListState";
import { act } from "react";

type Item = {
    id: string;
    name: string;
};

const list: Item[] = [
    {
        id: '1',
        name: 'Item 1'
    },
    {
        id: '2',
        name: 'Item 2'
    }
];

describe('useSelectableListState', () => {
    it('initially has an empty selected state', () => {
        const { result } = renderHook(() => useSelectableListState<Item>({ list }))

        expect(result.current.selected).toEqual({});
    });
    
    it('adds item when handleCheck checked true', () => {
        const { result } = renderHook(() => useSelectableListState<Item>({ list }))

        act(() => {
            result.current.handleCheck('1', true);
        });

        expect(result.current.selected).toEqual({ '1': list[0] });
    });
    
    it('removes item when handleCheck checked false', () => {
        const { result } = renderHook(() => useSelectableListState<Item>({ list }))

        act(() => {
            result.current.handleCheck('1', true);
        });

        act(() => {
            result.current.handleCheck('1', false);
        });

        expect(result.current.selected).toEqual({});
    });

    it('removes all when cleanSelected called', () => {
        const { result } = renderHook(() => useSelectableListState<Item>({ list }));

        act(() => {
            result.current.handleCheck('1', true);
            result.current.handleCheck('2', true);
        });

        act(() => {
            result.current.cleanSelected();
        });

        expect(result.current.selected).toEqual({});
    });

    it('handles right undefined list', () => {
        const { result } = renderHook(() => useSelectableListState<Item>({ list: undefined }));

        act(() => {
            result.current.handleCheck('1', true);
        });

        expect(result.current.selected).toEqual({});

        act(() => {
            result.current.handleCheck('1', false);
        });

        expect(result.current.selected).toEqual({});

        act(() => {
            result.current.cleanSelected();
        });
    
        expect(result.current.selected).toEqual({});
    });
});