import skills from "../utils/skills.json";

const allSkills = skills.flatMap(({ items }) => items);

function PortafolioSkills() {
  return (
    <section aria-label="Skills and Technologies">
      <h2 className="sr-only">Skills & Technologies</h2>
      <div className="w-full bg-white px-16 md:px-24 lg:px-40 py-10 flex flex-wrap gap-1 justify-between [&>*]:flex-1">
        {allSkills.map((skill) => (
          <span
            key={skill}
            className="bg-black text-white font-[var(--font-google)] font-medium text-base px-6 py-3 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default PortafolioSkills;
