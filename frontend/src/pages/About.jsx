import { useState } from "react";
import { Helmet } from "react-helmet-async";
import aboutData from "../utils/about.json";
import SkillGrid from "../components/SkillGrid";
import AboutText from "../components/AboutText";

function About() {
  const { img } = aboutData;
  const [tab, setTab] = useState("skills");

  return (
    <section className="w-full min-h-screen bg-red-600">
      <Helmet>
        <title>About | Andrés Cedillo — Creative Technologist</title>
        <meta name="description" content="Andrés Cedillo is a technologist and software developer specializing in electronic art, machine learning, generative visuals, and interactive software. Founder of Automata Lab, Mexico City." />
        <meta property="og:title" content="About | Andrés Cedillo — Creative Technologist" />
        <meta property="og:description" content="Technologist and software developer with 10+ years in the entertainment and interactive design industry. Founder of Automata Lab." />
        <meta property="og:url" content="https://andrescedillo.com/about" />
        <link rel="canonical" href="https://andrescedillo.com/about" />
      </Helmet>
      <div className="w-full pl-16 md:pl-24 lg:pl-40 pr-16 md:pr-24 lg:pr-40 py-5">
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

          {/* RIGHT COLUMN */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">

            {/* TOGGLE */}
            <div className="flex gap-0">
              {["skills", "cv"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-2 font-[var(--font-google)] font-bold uppercase text-sm tracking-widest transition-colors ${
                    tab === t ? "bg-black text-white" : "bg-red-600 text-black border border-black"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "skills" ? <SkillGrid /> : <AboutText />}
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
