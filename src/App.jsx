import gsap from "gsap";

import { Navbar, Welcome, Dock } from "#components";
import { Resume, Terminal } from "#windows";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Resume />
    </main>
  );
};

export default App;
