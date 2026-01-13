import React, { useEffect, useState } from "react";
import { fetchGithubImages } from "../utils/githubImages.js";
import portfolioLinks from "../utils/portfolioLinks.json";

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

  const rows = Array.isArray(portfolioLinks) ? portfolioLinks : [];
  const totalCells = rows.length * 2; // 2 cells per row

  return (
    <section className="bg-[rgb(238,28,37)] py-24">
      <div className="grid grid-cols-2 gap-px mx-auto overflow-visible w-fit">
        {Array.from({ length: 18 }).map((_, index) => {
          const rowIndex = Math.floor(index / 2);
          const isFirstCellInRow = index % 2 === 0;


          const showImageCell = index % 2 !== rowIndex % 2;


          const item = rows[rowIndex] || {};
          const projectId = String(item.id ?? rowIndex + 1);
          const projectUrl = item.url || null;

          const img = images.length ? images[rowIndex % images.length] : null;

          const parsedText = img ? parseFromSecondDash(img.name) : "";
          const displayText = parsedText || `PROJECT ${projectId}`;

          return (
            <div
              key={`${rowIndex}-${index}`}
              className="w-[920px] h-[360px] relative overflow-visible"
            >
              {/* BACKGROUND LAYER (non-clickable) */}
              {showImageCell ? (
                <>
                  {img && (
                    <img
                      src={img.download_url}
                      alt={displayText}
                      className="absolute inset-0 w-full h-full object-cover grayscale pointer-events-none"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-[rgb(1,90,172)] opacity-50 pointer-events-none" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[rgb(238,28,37)] pointer-events-none" />
              )}

              {/* TEXT OVERLAY (only once per row) */}
              {isFirstCellInRow && (
                <div className="absolute inset-0 z-50 flex items-center justify-center overflow-visible pointer-events-none">
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
                      select-none
                    "
                  >
                    {projectUrl ? (
                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto cursor-pointer hover:opacity-70 transition-opacity"
                        aria-label={`Open ${displayText}`}
                      >
                        {displayText}
                      </a>
                    ) : (
                      <span className="opacity-70">{displayText}</span>
                    )}
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
