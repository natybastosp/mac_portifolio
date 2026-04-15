import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Define font weight ranges for different text types
// Subtitle: ranges from 100 to 400 with default 100
// Title: ranges from 400 to 900 with default 400
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

// Sets up interactive font weight animation on text based on mouse position
// Creates a hover effect where letters change weight based on proximity to cursor
// Removes event listeners when component unmounts
const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  // Animates a single letter's font weight using GSAP
  // Uses power2.out easing for smooth transitions
  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  // Handles mouse movement to update letter weights based on proximity
  // Calculates distance between mouse position and each letter's center
  // Uses exponential decay to create a smooth intensity gradient
  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  // Resets all letters to their default font weight when mouse leaves the container
  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Renders text by splitting it into individual character spans
// Each character becomes an animatable element
// Non-breaking spaces are used for spaces to preserve formatting
const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

// Welcome component - displays an interactive hero section with animated text
// Features interactive font-weight animation on mouse hover for title and subtitle
const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Initialize text hover effects using GSAP
  // Cleans up event listeners when component unmounts
  useGSAP(() => {
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      cleanupTitle && cleanupTitle();
      cleanupSubtitle && cleanupSubtitle();
    };
  }, []);

  return (
    <section id="welcome">
      {/* Subtitle with interactive font-weight animation */}
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Natalia! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>

      {/* Main title with interactive font-weight animation */}
      <h1 ref={titleRef} className="mt-4">
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      {/* Mobile/tablet notification - hidden on larger screens */}
      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
