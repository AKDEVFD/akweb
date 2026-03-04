import { useState } from "react";
import aboutData from "../utils/about.json";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function AboutText() {
  const { heading, bio } = aboutData;
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + bio.length) % bio.length);
  const next = () => setIndex((i) => (i + 1) % bio.length);

  return (
    <div className="w-full flex flex-col gap-8">

      <h1 className="font-[var(--font-google)] text-4xl md:text-5xl font-extrabold text-black break-words">
        {heading}
      </h1>

      {/* PARAGRAPH AREA */}
      <p className="text-base md:text-lg leading-relaxed text-black/80 text-justify break-words w-full">
        {bio[index]}
      </p>

      {/* CAROUSEL CONTROLS */}
      <div className="flex items-center gap-5">
        <button
          onClick={prev}
          className="text-black/30 hover:text-black transition-colors"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {bio.map((_, i) => (
            <div
              key={i}
              className={`h-px w-10 transition-colors duration-300 ${i === index ? "bg-black" : "bg-black/15"}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="text-black/30 hover:text-black transition-colors"
          aria-label="Next"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

export default AboutText;
