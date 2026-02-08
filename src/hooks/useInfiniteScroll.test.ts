import { renderHook } from "@testing-library/react";
import useInfiniteScroll, { type useInfiniteScrollProps } from "./useInfiniteScroll";
import { vi } from "vitest";
import { act } from "react";

let observerCallback: IntersectionObserverCallback;

const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

class IntersectionObserverMock {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }

  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as any);

describe("useInfiniteScroll", () => {
  const fetchNextPage = vi.fn();

  const defaultProps = {
    hasNextPage: true,
    isFetchingNextPage: false,
    fetchNextPage
  } as useInfiniteScrollProps;

  it('returns a ref object', () => {
    const { result } = renderHook(() => useInfiniteScroll(defaultProps));

    expect(result.current).toHaveProperty('current');
    expect(result.current.current).toBeNull();
  });

  it('It calls fetchNextPage when the element intersects', () => {
    const { result } = renderHook(() => useInfiniteScroll(defaultProps));

    const div = document.createElement("div");
    result.current.current = div;

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: div,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });
});