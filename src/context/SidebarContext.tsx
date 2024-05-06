import { createContext, useContext, useState } from "react";

type SidebarProviderProps = {
  children: React.ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const sidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const value = useContext(sidebarContext);
  if (value == null) throw new Error("Cannot use outside of Sidebar Provider");

  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((s) => !s);
    } else {
      setIsLargeOpen((l) => !l);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <sidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </sidebarContext.Provider>
  );
}
