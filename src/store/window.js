// Import configuration constants for windows
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
// Zustand: lightweight state management library
import { create } from "zustand";
// Immer middleware for simpler state mutations in Zustand
import { immer } from "zustand/middleware/immer";

// Global Zustand store for managing windows state
// Handles opening/closing windows, z-index layering, and window data
const useWindowStore = create(
  immer((set) => ({
    // Initial windows configuration
    windows: WINDOW_CONFIG,
    // Tracks the next available z-index for window layering
    nextZIndex: INITIAL_Z_INDEX + 1,

    // Opens a window and brings it to focus by updating its z-index
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        // Store optional data (e.g., project details, file content)
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    // Closes a window and resets it to initial z-index
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    // Brings a window to focus by incrementing its z-index above others
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
