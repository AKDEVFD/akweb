import React from "react";

const blogPosts = [
  {
    title: "Post 01 — Machine Memory",
    content: "A short reflection on how machines remember and what they forget.",
    synopsis:
      "Notes on storage, retrieval, and the politics of keeping data alive in the background.",
  },
  {
    title: "Post 02 — Latent Cities",
    content: "Mapping Mexico City as an embedding space of sound and movement.",
    synopsis:
      "From MFCCs to t-SNE: a practical approach to turning urban noise into navigable geometry.",
  },
  {
    title: "Post 03 — Federated Dreams",
    content:
      "Building search tools that protect communities while expanding collective imagination.",
    synopsis:
      "A prototype direction: explainable ranking, rotating proxies, and local-first archives.",
  },
  {
    title: "Post 04 — Real-time Rituals",
    content: "TouchDesigner as a stage for feedback loops and responsive narratives.",
    synopsis:
      "Designing scenes as state machines: when sensors, voice, and visuals become one system.",
  },
];

function BlogGrid() {
  return (
    <section className="bg-[rgb(238,28,37)] py-24">
      <div className="grid grid-cols-2 gap-px w-fit mx-auto overflow-visible">
        {[...Array(18)].map((_, index) => {
          const row = Math.floor(index / 2);

          // SAME intercalation logic
          const showContent = (index % 2) !== (row % 2);

          const post = blogPosts[row % blogPosts.length];

          return (
            <div
              key={index}
              className="w-[920px] h-[360px] relative overflow-hidden"
            >
              {showContent ? (
                // 🟦 EMPTY / RHYTHM CELL
                <div className="absolute inset-0 bg-[rgb(1,90,172)]" />
              ) : (
                // 🟥 CONTENT CELL
                <div className="absolute inset-0 bg-[rgb(238,28,37)] flex items-center">
                  <div className="px-12 md:px-16 w-full">
                    <h3 className="font-[var(--font-google)] text-4xl md:text-5xl font-extrabold text-black leading-tight">
                      {post.title}
                    </h3>

                    <p className="mt-4 text-xl md:text-2xl text-black/90 leading-snug max-w-[40ch]">
                      {post.content}
                    </p>

                    <p className="mt-4 text-lg md:text-xl text-black/80 leading-snug max-w-[60ch]">
                      {post.synopsis}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BlogGrid;
