// Import window state management
import useWindowStore from "#store/window";
import React from "react";

// WindowControls component - displays close, minimize, and maximize buttons
// Only close is functional; minimize and maximize are visual placeholders
const WindowControls = ({ target }) => {
  // Get the closeWindow function from global store
  const { closeWindow } = useWindowStore();
  return (
    <div id="window-controls">
      {/* Close button - closes the specified window */}
      <div className="close" onClick={() => closeWindow(target)} />
      {/* Minimize button - placeholder (not yet functional) */}
      <div className="minimize" />
      {/* Maximize button - placeholder (not yet functional) */}
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;
