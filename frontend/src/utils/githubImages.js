import axios from "axios";

const BASE_URL = "https://api.github.com/repos/AKDEVFD/akport/contents/";

export async function fetchGithubImages(folderPath = "reactgrid") {
  try {
    const response = await axios.get(`${BASE_URL}${folderPath}`);

    return response.data.filter(
      (file) =>
        file.type === "file" &&
        /\.(png|jpe?g|webp)$/i.test(file.name)
    );
  } catch (error) {
    console.error("Error fetching GitHub images:", error);
    throw error;
  }
}

export async function fetchArtworkImages() {
  const url = "https://api.github.com/repos/AKDEVFD/blogakimg/contents/artworks";
  try {
    const response = await axios.get(url);
    return response.data.filter(
      (file) =>
        file.type === "file" &&
        /\.(png|jpe?g|webp)$/i.test(file.name)
    );
  } catch (error) {
    console.error("Error fetching artwork images:", error);
    throw error;
  }
}
