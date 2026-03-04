import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="w-full flex flex-col md:flex-row">
      {/* LEFT PANEL */}
      <div
        className="
         bg-[rgb(0, 0, 0)] flex items-center justify-center md:justify-start
          w-full md:w-[520px] lg:w-[920px] xl:w-[920px]
          h-20 md:h-28 lg:h-36 xl:h-44
          px-6 md:px-10
        "
      >
        <div className="text-black font-[var(--font-header)] font-extrabold tracking-tight uppercase text-4xl md:text-6xl xl:text-8xl">
          AACC
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="
          flex-1 bg-[rgb(0, 0, 0)]
          h-20 md:h-28 lg:h-36 xl:h-44
          px-4 md:px-10
        "
      >
        <ul className="h-full flex items-center justify-center md:justify-end flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link
              to="/about"
              className="font-[var(--font-google)] font-extrabold text-black text-base md:text-2xl lg:text-3xl"
            >
              About Me
            </Link>
          </li>

          <li>
            <Link
              to="/portfolio"
              className="font-[var(--font-google)] font-extrabold text-black text-base md:text-2xl lg:text-3xl"
            >
              Portfolio
            </Link>
          </li>

          <li>
            <Link
              to="/blog"
              className="font-[var(--font-google)] font-extrabold text-black text-base md:text-2xl lg:text-3xl"
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
