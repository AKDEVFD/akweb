import React from "react";
import { Helmet } from "react-helmet-async";
import aboutData from "../utils/about.json";

function About() {
  const { img, heading, bio } = aboutData;

  return (
    <section className="w-full min-h-screen bg-white">
      <Helmet>
        <title>About | Andrés Cedillo — Creative Technologist</title>
        <meta name="description" content="Andrés Cedillo is a technologist and software developer specializing in electronic art, machine learning, generative visuals, and interactive software. Founder of Automata Lab, Mexico City." />
        <meta property="og:title" content="About | Andrés Cedillo — Creative Technologist" />
        <meta property="og:description" content="Technologist and software developer with 10+ years in the entertainment and interactive design industry. Founder of Automata Lab." />
        <meta property="og:url" content="/about" />
        <link rel="canonical" href="/about" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-16 md:px-24 lg:px-40 py-5">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* IMAGE COLUMN */}
          <div className="w-full md:w-1/3 shrink-0">
            {img && (
              <img
                src={img}
                alt="Andrés Cedillo — Creative Technologist and Founder of Automata Lab"
                width="520"
                height="520"
                className="w-full h-[520px] object-cover grayscale"
                loading="lazy"
              />
            )}
          </div>

          {/* TEXT COLUMN */}
          <div className="w-full md:w-2/3">
            <h1 className="font-[var(--font-google)] text-4xl md:text-5xl font-extrabold text-black text-left">
              {heading}
            </h1>

            <div className="mt-8">
              {bio &&
                bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg leading-relaxed text-black/80 mt-4 first:mt-0 text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
