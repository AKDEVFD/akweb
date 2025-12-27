import React from "react";
import aboutData from "../utils/about.json";

function About() {
  const { img, heading, projectText, bio } = aboutData;

  return (
    <section className="w-full min-h-screen">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 bg-[rgb(238,28,37)] flex items-center">
          <div className="w-full px-8 md:px-16 py-16">
            <h2 className="font-[var(--font-google)] text-5xl md:text-6xl font-extrabold text-black">
              {heading}
            </h2>

            <div className="mt-10 max-w-xl">
              {bio &&
                bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-xl md:text-2xl leading-relaxed text-black/80 mt-6 first:mt-0"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 relative min-h-[420px] md:min-h-screen overflow-hidden">
          {img && (
            <img
              src={img}
              alt={projectText}
              className="absolute inset-0 w-full h-full object-cover grayscale"
              loading="lazy"
            />
          )}

          <div className="absolute inset-0 bg-[rgb(1,90,172)] opacity-50" />
        </div>
      </div>
    </section>
  );
}

export default About;
