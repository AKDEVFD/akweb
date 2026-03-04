import skills from "../utils/skills.json";

function SkillGrid() {
  return (
    <div className="flex flex-col gap-5">
      {skills.map(({ category, items }) => (
        <div key={category} className="flex flex-col gap-2">
          <p className="font-[var(--font-google)] text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
            {category}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {items.map((skill) => (
              <span
                key={skill}
                className="bg-black text-white font-[var(--font-google)] font-medium text-base px-6 py-3 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillGrid;
