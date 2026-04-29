import clients from "../utils/clients.json";

function PortafolioClients() {
  return (
    <section aria-label="Clients">
      <h2 className="sr-only">Clients</h2>
      <div className="w-full bg-red-600 px-16 md:px-24 lg:px-40 py-10 flex flex-wrap gap-1 justify-between [&>*]:flex-1">
        {clients.map(({ name, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white font-[var(--font-google)] font-medium text-base px-6 py-3 whitespace-nowrap hover:bg-red-600 hover:text-black transition-colors duration-200"
          >
            {name}
          </a>
        ))}
      </div>
    </section>
  );
}

export default PortafolioClients;
