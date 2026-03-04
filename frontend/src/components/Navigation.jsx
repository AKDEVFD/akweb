import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white relative h-20 md:h-28 lg:h-36 xl:h-44 flex items-center">
      {/* LOGO — absolutely centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-black font-[var(--font-header)] font-extrabold tracking-tight uppercase text-4xl md:text-6xl xl:text-8xl">
          AACC
        </span>
      </div>

      {/* MENU BUTTON — pinned to the right */}
      <div className="absolute right-[15%] z-10">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <XMarkIcon className="w-8 h-8 md:w-10 md:h-10" />
          ) : (
            <Bars3Icon className="w-8 h-8 md:w-10 md:h-10" />
          )}
        </button>

        {/* DROPDOWN */}
        {menuOpen && (
          <ul className="absolute top-full right-0 mt-2 bg-white shadow-lg min-w-[180px] flex flex-col z-50">
            {[
              { to: "/about", label: "About Me" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/blog", label: "Blog" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="block px-8 py-4 font-[var(--font-google)] font-extrabold text-black text-xl hover:bg-gray-100 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
