import { Navbar, Welcome, Dock } from "#components";

import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

import React from "react";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  );
};

export default App;
