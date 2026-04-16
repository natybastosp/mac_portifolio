// Import window state management from Zustand store
import useWindowStore from "#store/window";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
// GSAP Draggable plugin for making elements draggable
import { Draggable } from "gsap/Draggable";

// Higher-Order Component (HOC) that wraps components to make them draggable windows
// Adds opening/closing animations, drag functionality, and z-index management
const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    // Get window state and focus control from global store
    const { focusWindow, windows } = useWindowStore();

    // Get window properties (open state and z-index for layering)
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // Animate window opening with scale, opacity, and position transition
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      // Animate from small (0.8x) to full size with fade-in effect
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    // Set up draggable functionality and focus on press
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      // Create draggable instance and focus window when dragging starts
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });

      // Cleanup: destroy draggable instance on unmount
      return () => instance.kill();
    }, []);

    // Control visibility based on isOpen state
    // Uses layout effect to avoid visual flicker from render delays
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        {/* Render the wrapped component with all props passed through */}
        <Component {...props} />
      </section>
    );
  };

  // Set display name for debugging and React DevTools
  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
