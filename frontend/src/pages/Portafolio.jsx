import { Helmet } from "react-helmet-async";
import ImageCardGrid from "../components/ImageCardGrid.jsx";

export default function Portafolio() {
  return (
    <div className="bg-black min-h-screen">
      <Helmet>
        <title>Portfolio | Andrés Cedillo — Creative Technologist</title>
        <meta name="description" content="Portfolio of Andrés Cedillo — interactive installations, generative visuals, VR/AR experiences, and creative software projects for clients including Nike, Adidas, Huawei, and events like Burning Man and Mutek." />
        <meta property="og:title" content="Portfolio | Andrés Cedillo — Creative Technologist" />
        <meta property="og:description" content="Interactive installations, generative visuals, VR/AR experiences, and creative software projects." />
        <meta property="og:url" content="/portfolio" />
        <link rel="canonical" href="/portfolio" />
      </Helmet>
      <ImageCardGrid />
    </div>
  );
}
