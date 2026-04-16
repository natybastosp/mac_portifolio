// GSAP library for animations
import gsap from "gsap";

// Import app configurations and React/UI dependencies
import { dockApps } from "#constants";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window";

// Dock component - displays an interactive macOS-style dock with app icons
// Features hover-based scale and elevation animation for each icon
const Dock = () => {
  // Get window management functions and current window states from store
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  // Set up animation effects when component mounts
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    // Select all dock icon elements for animation
    const icons = dock.querySelectorAll(".dock-icon");

    // Animates all icons based on mouse position
    // Icons scale up and move up based on proximity to mouse cursor
    const animateIcon = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        // Uses exponential decay for smooth intensity falloff
        const intensity = Math.exp(-(distance ** 2.5) / 2000);

        // Apply scale (up to 1.25x) and upward movement based on intensity
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    // Handles mouse movement over the dock
    // Calculates relative position and triggers icon animation
    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();

      animateIcon(e.clientX - left);
    };

    // Resets all icons to normal size and position when mouse leaves
    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" }),
      );

    // Attach event listeners for hover effects
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    // Cleanup: remove event listeners when component unmounts
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  });

  // Toggles app window open/closed on click
  // Does nothing if the app is not available (canOpen = false)
  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const window = windows[app.id];
    // Close if already open, otherwise open
    if (window && window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log(`Toggled ${app.name}`);
  };

  return (
    <section id="dock">
      {/* Main dock container with ref for animation */}
      <div ref={dockRef} className="dock-container">
        {/* Render each available app as an interactive dock icon */}
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, name, canOpen })}
            >
              {/* App icon image with lazy loading */}
              <img
                src={`/images/${icon}`}
                alt={`${name} icon`}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
            {/* Tooltip showing app name on hover */}
            <Tooltip id="dock-tooltip" place="top" className="tooltip" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dock;
