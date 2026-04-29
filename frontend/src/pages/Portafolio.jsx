import { Helmet } from "react-helmet-async";
import ImageCardGrid from "../components/ImageCardGrid.jsx";
import PortafolioClients from "../components/PortafolioClients.jsx";
import PortafolioBanner from "../components/PortafolioBanner.jsx";

export default function Portafolio() {
  return (
    <div className="bg-red-500 min-h-screen">
      <Helmet>
        <title>Andrés Cedillo — Software Developer · Creative Technologist · New Media Artist</title>
        <meta name="description" content="Andrés Cedillo — Software Developer, Creative Technologist and New Media Artist based in Mexico City. Electronic art, generative visuals, interactive installations, and creative software." />
        <meta property="og:title" content="Andrés Cedillo — Software Developer · Creative Technologist · New Media Artist" />
        <meta property="og:description" content="Andrés Cedillo — Software Developer, Creative Technologist and New Media Artist based in Mexico City. Electronic art, generative visuals, interactive installations, and creative software." />
        <meta property="og:url" content="https://andrescedillo.com" />
        <link rel="canonical" href="https://andrescedillo.com" />
      </Helmet>
      <PortafolioBanner />
      <PortafolioClients />
      <ImageCardGrid />
    </div>
  );
}
