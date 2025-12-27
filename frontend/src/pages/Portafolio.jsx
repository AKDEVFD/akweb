import React, { useEffect, useState } from "react";
import { fetchGithubImages } from "../utils/githubImages.js";

function parseFromSecondDash(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const parts = nameWithoutExt.split("-");
  return parts[2] || "";
}

function ProjectGrid() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGithubImages().then(setImages).catch(console.error);
  }, []);

  return (
    <section className="bg-[rgb(238,28,37)] py-24">
      <div className="grid grid-cols-2 gap-px w-fit mx-auto overflow-visible">
        {[...Array(18)].map((_, index) => {
          const row = Math.floor(index / 2);
          const showContent = (index % 2) !== (row % 2);

          const img = images.length ? images[row % images.length] : null;
          const projectText = img ? parseFromSecondDash(img.name) : `PROJECT ${row + 1}`;

          // ✅ Only render the text overlay once per row (first cell)
          const isFirstCellInRow = index % 2 === 0;

          return (
            <div
              key={index}
              className="w-[920px] h-[360px] relative overflow-visible"
            >
              {/* BACKGROUND LAYER (intercalated) */}
              {showContent ? (
                <>
                  {img && (
                    <img
                      src={img.download_url}
                      alt={projectText}
                      className="absolute inset-0 w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-[rgb(1,90,172)] opacity-50" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[rgb(238,28,37)]" />
              )}

              {/* ✅ TEXT OVERLAY (only once per row) */}
              {isFirstCellInRow && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-visible">
<h3
  className="
    w-[1840px]
    mx-auto
    text-center
    font-extrabold text-black
    tracking-tight leading-tight
    break-words hyphens-auto
    text-[clamp(3rem,12vw,12rem)]
    relative
    left-1/2
    -translate-x-1/2
    translate-x-[50px]
    md:translate-x-[-550px]
    lg:translate-x-[50px]

  "
>
  {projectText}
</h3>


                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectGrid;
