"use client";

import React, { createContext, useContext, useRef, RefObject } from "react";

interface ScrollContextValue {
  containerRef: RefObject<HTMLElement | null> | undefined;
  isWindowScroll: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({
  containerRef: undefined,
  isWindowScroll: true,
});

export function useScrollContainer() {
  return useContext(ScrollContext);
}

interface ScrollContainerProviderProps {
  children: React.ReactNode;
  containerRef?: RefObject<HTMLElement | null>;
}

export function ScrollContainerProvider({
  children,
  containerRef,
}: ScrollContainerProviderProps) {
  const value: ScrollContextValue = {
    containerRef: containerRef,
    isWindowScroll: !containerRef,
  };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
