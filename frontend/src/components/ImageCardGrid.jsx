import { useEffect, useState } from "react";
import { fetchGithubImages } from "../utils/githubImages.js";
import portfolioLinks from "../utils/portfolioLinks.json";

function formatTitle(filename) {
  return filename
    .replace(/\.(png|jpe?g|webp|gif)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ImageCardGrid() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubImages()
      .then((imgs) => {
        setImages(imgs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full py-24 bg-white flex items-center justify-center">
        <span className="text-white tracking-widest opacity-50">Loading...</span>
      </div>
    );
  }

  return (
    <section className="bg-white py-10">
      <div className="grid grid-cols-1 gap-4 w-full px-16 md:px-24 lg:px-40">
        {images.map((img, i) => {
          const link = portfolioLinks[i] || null;
          return (
            <a
              key={img.sha}
              href={link?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden aspect-[32/9] block"
            >
              <img
                src={img.download_url}
                alt={img.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-4 py-3">
                <span className="text-white font-[var(--font-header)] font-semibold text-2xl md:text-4xl lg:text-5xl tracking-wide uppercase">
                  {formatTitle(img.name)}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
