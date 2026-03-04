import React, { useEffect, useState } from "react";
import { fetchGithubImages } from "../utils/githubImages.js";

export default function ImageBack() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchGithubImages("imgback")
      .then((imgs) => {
        if (imgs.length > 0) setImage(imgs[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {image && (
        <img
          src={image.download_url}
          alt={image.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}
