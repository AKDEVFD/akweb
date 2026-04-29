import { Helmet } from "react-helmet-async";
import ArtworksBanner from "../components/ArtworksBanner.jsx";
import ImageGridArtworks from "../components/ImageGridArtworks.jsx";

export default function Artworks() {
  return (
    <div className="bg-red-500 min-h-screen">
      <Helmet>
        <title>Artworks — Andrés Cedillo</title>
        <meta name="description" content="Artworks by Andrés Cedillo — Creative Technologist and New Media Artist based in Mexico City." />
      </Helmet>
      <ArtworksBanner />
      <ImageGridArtworks />
    </div>
  );
}
