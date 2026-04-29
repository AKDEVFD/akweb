import { useEffect, useState } from "react";
import { fetchArtworkImages } from "../utils/githubImages.js";

function formatTitle(filename) {
  return filename
    .replace(/\.(png|jpe?g|webp|gif)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ImageGridArtworks() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtworkImages()
      .then((imgs) => { setImages(imgs); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full py-24 bg-red-500 flex items-center justify-center">
        <span className="text-black tracking-widest opacity-50">Loading…</span>
      </div>
    );
  }

  return (
    <section className="bg-red-500 py-10">
      <div className="px-16 md:px-24 lg:px-40">
        <div className="flex flex-col gap-3">
          {images.map((img) => (
            <div
              key={img.sha}
              className="group relative bg-red-500s w-full flex items-center justify-center py-6"
            >
              <img
                src={img.download_url}
                alt={img.name}
                loading="lazy"
                className="max-h-[480px] max-w-full w-auto object-contain"
              />
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <span className="w-full px-4 py-3 text-white font-[var(--font-header)] font-semibold tracking-wide uppercase text-sm md:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {formatTitle(img.name)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
