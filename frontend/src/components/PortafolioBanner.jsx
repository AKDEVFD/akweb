export default function PortafolioBanner() {
  const text = "WORKING ALONG COMPANIES, STUDIOS AND PROFESSIONALS TO DEVELOP CREATIVE TECHNOLOGY";

  return (
    <div className="bg-red-600 py-1">
      <div className="bg-black mx-16 md:mx-24 lg:mx-40 overflow-hidden border-t border-b border-white/10 py-5">
        <div className="flex  whitespace-nowrap animate-marquee">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="shrink-0 pr-20 text-7xl text-white/90 tracking-wide font-[var(--font-google)]"
            >
              {text}
              <span className="mx-10 text-white/30">|</span>
              {text}
              <span className="mx-10 text-white/30">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
