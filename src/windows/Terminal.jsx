// Higher-Order Component for wrapping components as draggable windows
import WindowWrapper from "#hoc/WindowWrapper";
import React from "react";

// Import tech stack data from constants
import { techStack } from "#constants";
// Icons from lucide-react library
import { Check, Flag } from "lucide-react";
// Window header controls (close, minimize, maximize buttons)
import { WindowControls } from "#components";

// Terminal component - displays tech stack in a terminal-like interface
const Terminal = () => {
  return (
    <>
      {/* Window header with controls and title */}
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      {/* Terminal-style content */}
      <div className="techstack">
        {/* Command prompt simulation */}
        <p>
          <span className="font-bold">@naty %</span>
          show tech stack
        </p>

        {/* Column headers for the tech stack table */}
        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        {/* List of tech stack items grouped by category */}
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              {/* Check icon indicating loaded item */}
              <Check className="check" size={20} />
              <h3>{category}</h3>
              {/* Technologies within category separated by commas */}
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Footer with success status and render time */}
        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
          </p>
          <p className="text-black">
            <Flag size={15} fill="black" /> Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

// Export Terminal component wrapped with window functionality (draggable, animated, etc.)
const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
