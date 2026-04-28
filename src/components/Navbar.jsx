// dayjs library for date/time formatting
import dayjs from "dayjs";
// Import navigation configuration data
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";

// Navbar component - displays top navigation bar with logo, links, icons, and current time
const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      {/* Left side: Logo and branding */}
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold"> Natalia's Portfolio</p>

        {/* Navigation links menu */}
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Social icons and time display */}
      <div>
        {/* Social/navigation icons */}
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt="{`icon-${id}`}" className="icon-hover" />
            </li>
          ))}
        </ul>
        {/* Current date and time formatted as: "Mon Apr 16 2:30 PM" */}
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
